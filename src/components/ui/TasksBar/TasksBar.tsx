import { ITaskDisplay } from '@custom-types/data/ITask';
import { ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { FC, memo } from 'react';
import { Home } from 'tabler-icons-react';
import styles from './tasksBar.module.css';

const colors = {
  NULL: 'var(--dark4)',
  OK: 'var(--positive)',
  TESTING: 'var(--neutral)',
  ERR: 'var(--negative)',
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const TasksBar: FC<{
  tasks: ITaskDisplay[];
  assignment: string;
}> = ({ tasks, assignment }) => {
  return (
    <>
      {tasks.length > 0 && (
        <div className={styles.wrapper}>
          <ActionIcon
            className={styles.taskStatus}
            style={{
              backgroundColor: 'var(--primary)',
            }}
            component="a"
            href={`/edu/assignment/${assignment}`}
          >
            <Home color="white" />
          </ActionIcon>
          {tasks.map((task, index) => (
            <Link
              href={`/task/${task.spec}?assignment=${assignment}`}
              key={index}
              passHref
            >
              <a
                className={styles.taskStatus}
                style={{
                  backgroundColor:
                    task.status && task.status.spec != 2
                      ? colors.TESTING
                      : !task.verdict
                      ? colors.NULL
                      : task.verdict.shortText == 'OK'
                      ? colors.OK
                      : colors.ERR,
                }}
              >
                {alphabet[index % 26]}
              </a>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(TasksBar);
