import { FC, memo } from 'react';
import styles from './resultsTable.module.css';
import DropdownList from './DropdownList/DropdownList';
import Link from 'next/link';
import { setter } from '@custom-types/ui/atomic';
import { Icon } from '@ui/basics';
import { RefreshDot } from 'tabler-icons-react';

export interface ILabel {
  text: string;
  href?: string;
}

export interface IData {
  best: string;
  rest: ILabel[];
}

const ResultsTable: FC<{
  columns: ILabel[];
  rows: ILabel[];
  data: IData[][];
  refetch: setter<boolean>;
}> = ({ columns, rows, data, refetch }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Icon size="sm" onClick={() => refetch(true)}>
                <RefreshDot color="var(--secondary)" />
              </Icon>
            </th>
            {columns.map((column, index) => (
              <th key={index}>
                {column.href ? (
                  <Link
                    href={column.href}
                    passHref
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {column.text}
                  </Link>
                ) : (
                  <div style={{ width: 'fit-content' }}>
                    {column.text}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className={styles.rowHeader}>
                {row.href ? (
                  <Link
                    href={row.href}
                    passHref
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {row.text}
                  </Link>
                ) : (
                  <>{row.text}</>
                )}
              </td>
              {data[index].map((cell, idx) => (
                <td key={idx} style={{ cursor: 'pointer' }}>
                  <DropdownList cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(ResultsTable);
