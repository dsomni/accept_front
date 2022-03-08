import { ITableColumn } from '@custom-types/ITable';
import { FC, memo, useMemo } from 'react';
import Column from '../Column/Column';
import Row from '../Row/Row';

const InnerTable: FC<{
  columns: ITableColumn[];
  rows: any[];
  sort: (key: string, order: -1 | 0 | 1) => void;
  classNames: any;
}> = ({ columns, classNames, rows, sort }) => {
  const keys = useMemo(
    () => columns.map((column) => column.key),
    [columns]
  );

  const gridTemplate = useMemo(
    () => ({
      gridTemplateColumns:
        columns.map((column) => column.size).join('fr ') + 'fr',
    }),
    [columns]
  );

  return (
    <table className={classNames.table}>
      <thead>
        <tr style={gridTemplate}>
          {columns.map((column, index) => (
            <Column
              key={index}
              column={column}
              onSort={sort}
              classNames={classNames}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <Row
            keys={keys}
            key={index}
            row={row}
            classNames={classNames}
            even={(index + 1) % 2 == 0}
            gridTemplate={gridTemplate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default memo(InnerTable);
