import { FC, useEffect, useState } from 'react';
import { ITaskDisplay } from '@custom-types/data/ITask';
import styles from './description.module.css';
import { useLocale } from '@hooks/useLocale';
import PrimitiveTable from '@ui/PrimitiveTable/PrimitiveTable';
import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import { sendRequest } from '@requests/request';
import TagList from '@ui/TagList/TagList';
import { LoadingOverlay } from '@mantine/core';
import tableStyles from '@styles/ui/primitiveTable.module.css';
import { ITag } from '@custom-types/data/ITag';

const Description: FC<{
  assignment: IAssignmentSchema;
  preview?: boolean;
}> = ({ assignment, preview }) => {
  const { locale } = useLocale();

  const [tasks, setTasks] = useState<ITaskDisplay[]>(
    preview ? [] : assignment.tasks
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cleanUp = false;
    if (assignment.tasks.length) {
      setLoading(!!preview);
      sendRequest<string[], ITaskDisplay[]>(
        'task/list-specs',
        'POST',
        assignment.tasks.map((task: any) => task.value || task.spec),
        5000
      ).then((res) => {
        if (!cleanUp && !res.error) {
          setTasks(res.response);
          setLoading(false);
        }
      });
    }
    return () => {
      cleanUp = true;
    };
  }, [assignment.tasks, preview]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{assignment.title}</div>
        <div className={styles.defaultDuration}>{`${
          locale.assignmentSchema.defaultDuration
        } ${
          preview
            ? assignment.defaultDuration
            : Math.floor(assignment.defaultDuration / 1000 / 60)
        }m`}</div>
      </div>
      <div className={styles.tags}>
        <TagList tags={assignment.tags} />
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: assignment.description }}
      ></div>
      <div
        style={{
          position: 'relative',
          paddingBottom: 'var(--spacer-l)',
        }}
      >
        <LoadingOverlay visible={loading} />
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
      </div>
    </div>
  );
};

export default Description;
