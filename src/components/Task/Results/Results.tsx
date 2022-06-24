import { FC, memo, useCallback, useMemo } from 'react';
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

const Results: FC<{ spec: string }> = ({ spec }) => {
  const { locale, lang } = useLocale();

  const columns: ITableColumn[] = useMemo(
    () => [
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
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.language.value > b.language.value
            ? 1
            : a.language.value == b.language.value
            ? 0
            : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: false,
        hidden: false,
        size: 5,
      },
      {
        label: capitalize(locale.attempts.result),
        key: 'result',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.result.value > b.result.value
            ? 1
            : a.result.value == b.result.value
            ? 0
            : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: false,
        hidden: false,
        size: 5,
      },
    ],
    [locale]
  );

  const fetchAttempts = useCallback(async () => {
    return sendRequest<{}, IAttemptDisplay[]>(
      `task/attempts/${spec}`,
      'GET'
    ).then((res) => {
      if (!res.error) {
        return res.response
          .map((item) => ({
            ...item,
            result: {
              display: (
                <div
                  style={{
                    color:
                      item.status.spec == 2
                        ? item.verdict.verdict.spec == 0
                          ? 'var(--positive)'
                          : 'var(--negative)'
                        : 'black',
                  }}
                >
                  {item.status.spec == 2
                    ? item.verdict.verdict.shortText +
                      ' #' +
                      (item.verdict.test + 1).toString()
                    : capitalize(
                        locale.attempts.statuses[item.status.spec]
                      )}
                </div>
              ),
              value:
                item.status.spec == 2
                  ? item.verdict.verdict.spec
                  : item.status.spec - 10,
            },
            date: {
              display: <>{new Date(item.date).toLocaleString()}</>,
              value: new Date(item.date).getTime(),
            },
            language: {
              display: <>{item.language.name}</>,
              value: item.language,
            },
          }))
          .sort(
            (a, b) =>
              new Date(b.date.value).getTime() -
              new Date(a.date.value).getTime()
          );
      } else {
        const id = newNotification({});
        errorNotification({
          id,
          title: capitalize(locale.notify.task.attempts.list.error),
          message: res.detail.description[lang],
          autoClose: 5000,
        });
        return [];
      }
    });
  }, []);
  const needRefetch = useCallback((attempts: any[]) => {
    return true;
  }, []);

  return (
    <>
      <Table
        columns={columns}
        rows={[]}
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
        defaultOnPage={10}
        onPage={[5, 10]}
        searchKeys={[]}
        fetchFunction={fetchAttempts}
        needRefetch={needRefetch}
        refetchInterval={2000}
      />
    </>
  );
};

export default memo(Results);
