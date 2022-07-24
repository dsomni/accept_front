import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';

import { IAttemptDisplay } from '@custom-types/data/IAttempt';
import { ILocale } from '@custom-types/ui/ILocale';
import { getLocalDate } from '@utils/datetime';
import { useUser } from '@hooks/useUser';
import { useRequest } from '@hooks/useRequest';
import { BaseSearch } from '@custom-types/data/request';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

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
          : locale.attempts.statuses[attempt.status.spec]}
      </div>
    ),
    value:
      attempt.status.spec == 2
        ? attempt.verdict.verdict.spec
        : attempt.status.spec - 10,
  },
  date: {
    display: <>{getLocalDate(attempt.date)}</>,
    value: new Date(attempt.date).getTime(),
  },
  language: {
    display: <>{attempt.language.name}</>,
    value: attempt.language,
  },
});

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: locale.attempts.date,
    key: 'date',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.date.value > b.date.value
        ? -1
        : a.date.value == b.date.value
        ? 0
        : 1,
    sorted: -1,
    allowMiddleState: false,
    hidable: false,
    hidden: false,
    size: 5,
  },
  {
    label: locale.attempts.language,
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
    label: locale.attempts.result,
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

interface PagerResponse {
  data: IAttemptDisplay[];
  total: number;
}

interface TableData {
  data: any[];
  total: number;
}

const Results: FC<{ spec: string }> = ({ spec }) => {
  const { locale, lang } = useLocale();
  const { refreshAccess } = useUser();

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale]
  );

  const [needRefetch, setNeedRefetch] = useState(true);
  const [tableData, setTableData] = useState<TableData>({
    data: [],
    total: 0,
  });

  const [searchParams, setSearchParams] = useState<BaseSearch>({
    pager: {
      skip: 0,
      limit: defaultOnPage,
    },
    sort_by: [{ field: 'date', order: -1 }],
    search_params: {
      search: '',
      keys: [],
    },
  });

  const processData = useCallback(
    (response: PagerResponse): TableData => ({
      data: response.data.map((item) =>
        refactorAttempt(item, locale)
      ),
      total: response.total,
    }),
    [locale]
  );

  const onError = useCallback(
    (res: any) => {
      if (refreshAccess() == 2) {
        setTableData({ data: [], total: 0 });
        const id = newNotification({});
        errorNotification({
          id,
          title: locale.notify.errors.unauthorized,
          autoClose: 10000,
        });
        setNeedRefetch(false);
      } else {
        setNeedRefetch(true);
      }
    },
    [locale.notify.errors.unauthorized, refreshAccess]
  );

  const { data, loading, refetch } = useRequest<
    BaseSearch,
    PagerResponse,
    TableData
  >(
    `task/attempts/${spec}`,
    'POST',
    searchParams,
    processData,
    undefined,
    onError
  );

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
    const id = setInterval(() => {
      if (needRefetch) refetch(false);
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, [needRefetch, refetch]);

  return (
    <div>
      <Table
        columns={columns}
        rows={tableData.data}
        total={tableData.total}
        loading={loading}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
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
