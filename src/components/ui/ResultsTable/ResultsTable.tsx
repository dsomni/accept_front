import { FC, memo } from 'react';
import styles from './resultsTable.module.css';
import DropdownList from './DropdownList/DropdownList';
import Link from 'next/link';

export interface ILabel {
  text: string;
  href: string;
}

export interface IData {
  best: string;
  rest: ILabel[];
}

const ResultsTable: FC<{
  columns: ILabel[];
  rows: ILabel[];
  data: IData[][];
}> = ({ columns, rows, data }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Popa</th>
            {columns.map((column, index) => (
              <th key={index}>
                <Link href={column.text} passHref>
                  <a
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    {column.text}
                  </a>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className={styles.rowHeader}>{row.text}</td>
              {data[index].map((cell, idx) => (
                <td key={idx}>
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
