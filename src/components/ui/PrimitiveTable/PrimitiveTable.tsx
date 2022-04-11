import { FC, memo, ReactNode, useEffect } from 'react';

const PrimitiveTable: FC<{
  columns: string[];
  rows: any[];
  rowComponent: (row: any) => ReactNode;
  classNames?: any;
}> = ({ columns, rows, rowComponent, classNames }) => {
  return (
    <table className={classNames?.table}>
      <thead>
        <tr className={classNames?.row}>
          {columns.map((column, index) => (
            <th key={index} className={classNames?.column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={index}
            className={
              classNames?.row +
              ' ' +
              (index % 2 === 0 ? classNames?.even : '')
            }
          >
            {rowComponent(row)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(PrimitiveTable);
