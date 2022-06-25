import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import Table from '@components/ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { IAttemptDisplay } from '@custom-types/data/IAttempt';
import { sendRequest } from '@requests/request';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import { ILocale } from '@custom-types/ui/ILocale';
import { useTableStore } from '@hooks/useTableStore';

const refactorAttempt = (
  attempt: IAttemptDisplay,
  locale: ILocale
): any => ({
  ...attempt,
  result: {
    display: (
      <div
        style={{
          color:
            attempt.status.spec == 2
              ? attempt.verdict.verdict.spec == 0
                ? 'var(--positive)'
                : 'var(--negative)'
              : 'black',
        }}
      >
        {attempt.status.spec == 2
          ? attempt.verdict.verdict.shortText +
            ' #' +
            (attempt.verdict.test + 1).toString()
          : capitalize(locale.attempts.statuses[attempt.status.spec])}
      </div>
    ),
    value:
      attempt.status.spec == 2
        ? attempt.verdict.verdict.spec
        : attempt.status.spec - 10,
  },
  date: {
    display: <>{new Date(attempt.date).toLocaleString()}</>,
    value: new Date(attempt.date).getTime(),
  },
  language: {
    display: <>{attempt.language.name}</>,
    value: attempt.language,
  },
});

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: capitalize(locale.attempts.date),
    key: 'date',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.date.value > b.date.value
        ? -1
        : a.date.value == b.date.value
        ? 0
        : 1,
    sorted: 0,
    allowMiddleState: false,
    hidable: false,
    hidden: false,
    size: 5,
  },
  {
    label: capitalize(locale.attempts.language),
    key: 'language',
    sortable: false,
    sortFunction: (a: any, b: any) => 0,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 5,
  },
  {
    label: capitalize(locale.attempts.result),
    key: 'result',
    sortable: false,
    sortFunction: (a: any, b: any) => 0,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 5,
  },
];

const defaultOnPage = 10;

const Results: FC<{ spec: string }> = ({ spec }) => {
  const { locale, lang } = useLocale();

  const { data, setData, searchParams, setSearchParams, setLoading } =
    useTableStore();

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale]
  );

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(() => ({
      pager: {
        skip: 0,
        limit: defaultOnPage,
      },
      sort_by: [{ field: 'date', order: 1 }],
      search_params: {
        search: '',
        keys: [],
      },
    }));
  }, [setSearchParams]);

  const fetchAttempts = useCallback(() => {
    setLoading(true);
    sendRequest<{}, [IAttemptDisplay[], number]>(
      `task/attempts/${spec}`,
      'POST',
      searchParams
    ).then((res) => {
      if (!res.error) {
        setData([
          res.response[0].map((item) =>
            refactorAttempt(item, locale)
          ),
          res.response[1],
        ]);
      } else {
        const id = newNotification({});
        errorNotification({
          id,
          title: capitalize(locale.notify.task.attempts.list.error),
          message: res.detail.description[lang],
          autoClose: 5000,
        });
        setData([[], 0]);
      }
      setLoading(false);
    });
  }, [setLoading, spec, searchParams, setData, locale, lang]);

  useEffect(() => fetchAttempts(), [fetchAttempts]);

  return (
    <div>
      <Table
        columns={columns}
        classNames={{
          wrapper: tableStyles.wrapper,
          table: tableStyles.table,
          author: tableStyles.author,
          grade: tableStyles.grade,
          verdict: tableStyles.verdict,
          headerCell: tableStyles.headerCell,
          cell: tableStyles.cell,
          even: tableStyles.even,
          odd: tableStyles.odd,
        }}
        defaultOnPage={defaultOnPage}
        onPage={[5, 10]}
      />
    </div>
  );
};

export default memo(Results);
