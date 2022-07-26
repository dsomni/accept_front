import { FC, useEffect, useRef, useState } from 'react';
import { ITaskDisplay } from '@custom-types/data/ITask';
import styles from './description.module.css';
import { useLocale } from '@hooks/useLocale';
import PrimitiveTable from '@ui/PrimitiveTable/PrimitiveTable';
import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import { sendRequest } from '@requests/request';
import TagList from '@ui/TagList/TagList';

const Description: FC<{
  assignment: IAssignmentSchema;
  preview?: boolean;
}> = ({ assignment, preview }) => {
  const description = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();

  const [tasks, setTasks] = useState<ITaskDisplay[]>(
    preview ? [] : assignment.tasks
  );

  useEffect(() => {
    if (description.current)
      description.current.innerHTML = assignment.description;
  }, [assignment.description]);

  useEffect(() => {
    let cleanUp = false;
    if (assignment.tasks.length && preview)
      sendRequest<string[], ITaskDisplay[]>(
        'task/list-specs',
        'POST',
        assignment.tasks.map((task) => task.value || task.spec),
        5000
      ).then((res) => {
        if (!cleanUp && !res.error) {
          setTasks(res.response);
        }
      });

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
        } ${Math.floor(
          assignment.defaultDuration / 1000 / 60
        )}m`}</div>
      </div>
      <div className={styles.tags}>
        <TagList tags={assignment.tags} />
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: assignment.description }}
      ></div>
      <div>
        <PrimitiveTable
          columns={[
            locale.task.list.title,
            locale.task.list.author,
            locale.task.list.verdict,
          ]}
          rows={tasks}
          rowComponent={(row: any) => {
            return (
              <>
                <td className={styles.cell}>
                  <a
                    href={`/task/${row.spec}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.tableTitle}
                  >
                    {row.title}
                  </a>
                </td>
                <td className={styles.cell}>
                  {row.author.shortName}
                </td>
                <td
                  className={styles.cell}
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
            column: styles.column,
            row: styles.row,
            table: styles.tableWrapper,
            even: styles.even,
          }}
        />
      </div>
    </div>
  );
};

export default Description;
