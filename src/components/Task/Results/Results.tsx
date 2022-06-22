import { FC, memo, useEffect } from 'react';
import { IAttemptDisplay } from '@custom-types/data/IAttempt';
import styles from './results.module.css';
import { capitalize } from '@utils/capitalize';
import { useLocale } from '@hooks/useLocale';
import Table from '@components/ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import tableStyles from '@styles/ui/customTable.module.css';

const Results: FC<{ attempts: IAttemptDisplay[] }> = ({
  attempts,
}) => {
  const { locale } = useLocale();
  const columns: ITableColumn[] = [
    {
      label: capitalize(locale.attempts.date),
      key: 'date',
      sortable: true,
      sortFunction: (a: any, b: any) =>
        a.value > b.value ? 1 : a.value == b.value ? 0 : -1,
      sorted: 0,
      allowMiddleState: true,
      hidable: false,
      hidden: false,
      size: 5,
    },
    {
      label: capitalize(locale.attempts.language),
      key: 'language',
      sortable: true,
      sortFunction: (a: any, b: any) =>
        a.value > b.value ? 1 : a.value == b.value ? 0 : -1,
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
        a.value > b.value ? 1 : a.value == b.value ? 0 : -1,
      sorted: 0,
      allowMiddleState: true,
      hidable: false,
      hidden: false,
      size: 5,
    },
  ];
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
