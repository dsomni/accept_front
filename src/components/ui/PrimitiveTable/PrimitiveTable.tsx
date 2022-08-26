import { FC, ReactNode, memo, useMemo } from 'react';

const PrimitiveTable: FC<{
  columns: string[];
  rows: any[];
  rowComponent: (row: any) => ReactNode;
  classNames?: any;
  columnSizes?: number[];
}> = ({ columns, rows, rowComponent, classNames, columnSizes }) => {
  const gridTemplate = useMemo(() => {
    let total = 0;
    if (!columnSizes || columnSizes.length < columns.length) {
      total = columns.length;
      return {
        gridTemplateColumns:
          columns.map((column) => 100 / total).join('% ') + '%',
      };
    }
    for (let i = 0; i < columns.length; i++) {
      total += columnSizes[i];
    }
    return {
      gridTemplateColumns:
        columns
          .map((column, idx) => (columnSizes[idx] / total) * 100)
          .join('% ') + '%',
    };
  }, [columnSizes, columns]);

  return (
    <table className={classNames?.table}>
      <thead>
        <tr className={classNames?.row} style={gridTemplate}>
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
            style={gridTemplate}
          >
            {rowComponent(row)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(PrimitiveTable);
