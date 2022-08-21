import { FC, memo } from 'react';
import styles from './resultsTable.module.css';
import DropdownList from './DropdownList/DropdownList';

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
    <div
      style={{
        width: '500px',
        overflow: 'scroll',
        height: '200px',
      }}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            {columns.map((column, index) => (
              <th key={index}>{column.text}</th>
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
