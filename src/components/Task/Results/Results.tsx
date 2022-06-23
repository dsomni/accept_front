import { FC, memo, useMemo } from 'react';
import Table from '@components/ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';

const Results: FC<{ attempts: any[] }> = ({ attempts }) => {
  const { locale } = useLocale();

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
  return (
    <>
      {attempts.length > 0 && (
        <Table
          columns={columns}
          rows={attempts}
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
        />
      )}
    </>
  );
};

export default memo(Results);
