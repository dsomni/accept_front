import { ITaskDisplay } from '@custom-types/data/ITask';
import { useLogger } from '@mantine/hooks';
import Link from 'next/link';
import { FC, memo } from 'react';
import { Home } from 'tabler-icons-react';
import styles from './tasksBar.module.css';

const colors = {
  NULL: 'var(--dark4)',
  OK: 'var(--positive)',
  ERR: 'var(--negative)',
};

const colors1 = [
  'var(--dark4)',
  'var(--positive)',
  'var(--negative)',
];

const TasksBar: FC<{ tasks: ITaskDisplay[]; assignment: string }> = ({
  tasks,
  assignment,
}) => {
  useLogger('TasksBar', [tasks]);
  return (
    <>
      {tasks.length > 0 && (
        <div className={styles.wrapper}>
          <Link href={`/edu/assignment/${assignment}`}>
            <div
              className={styles.taskStatus}
              style={{
                backgroundColor: 'var(--primary)',
              }}
            >
              <Home color="black" />
            </div>
          </Link>
          {tasks.map((task, index) => (
            <Link
              href={`/task/${task.spec}?assignment=${assignment}`}
              key={index}
            >
              <div
                className={styles.taskStatus}
                style={{
                  backgroundColor:
                    colors1[Math.round(Math.random() * 2)],
                  // backgroundColor: !task.verdict
                  //   ? colors.NULL
                  //   : task.verdict.shortText == 'OK'
                  //   ? colors.OK
                  //   : colors.ERR,
                }}
              >
                {task.title.slice(0, 2)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(TasksBar);
