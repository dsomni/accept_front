import { useLocale } from '@hooks/useLocale';
import { FC, memo } from 'react';
import styles from './primitiveTaskTable.module.css';
import tableStyles from '@styles/ui/primitiveTable.module.css';
import PrimitiveTable from '@ui/PrimitiveTable/PrimitiveTable';
import { ITag } from '@custom-types/data/ITag';
import { ITaskDisplay } from '@custom-types/data/ITask';

const PrimitiveTaskTable: FC<{ tasks: ITaskDisplay[] }> = ({
  tasks,
}) => {
  const { locale } = useLocale();

  return (
    <PrimitiveTable
      columns={[
        locale.task.list.title,
        locale.task.list.author,
        locale.task.list.verdict,
      ]}
      columnSizes={[4, 1, 1]}
      rows={tasks}
      rowComponent={(row: any) => {
        return (
          <>
            <td className={tableStyles.titleWrapper}>
              <a
                href={`/task/${row.spec}`}
                target="_blank"
                rel="noreferrer"
                className={tableStyles.title}
              >
                {row.title}
              </a>
              {row.tags.length > 0 && (
                <span className={tableStyles.tags}>
                  {row.tags.map((tag: ITag, idx: number) => (
                    <div className={tableStyles.tag} key={idx}>
                      {tag.title +
                        (idx == row.tags.length - 1 ? '' : ', ')}
                    </div>
                  ))}
                </span>
              )}
            </td>
            <td className={tableStyles.cell}>{row.author}</td>
            <td
              className={tableStyles.cell}
              style={{
                color: row.verdict
                  ? row.verdict.spec === 0
                    ? 'var(--positive)'
                    : 'var(--negative)'
                  : 'black',
              }}
            >
              {row.verdict?.shortText || '-'}
            </td>
          </>
        );
      }}
      classNames={{
        column: tableStyles.column,
        row: tableStyles.row,
        table: tableStyles.table,
        even: tableStyles.even,
      }}
    />
  );
};

export default memo(PrimitiveTaskTable);
