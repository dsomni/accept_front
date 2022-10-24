import { ITask } from '@custom-types/data/ITask';
import { sendRequest } from '@requests/request';
import ComponentToPDF from '@ui/ComponentToPDF/ComponentToPDF';
import { FC, ReactNode, memo, useEffect, useState } from 'react';
import Description from '../Description/Description';
import styles from './printTasks.module.css';

const PrintTasks: FC<{
  tasks: string[];
  title: ReactNode | string;
  description: ReactNode | string;
}> = ({ tasks: task_specs, title, description }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    sendRequest<string[], ITask[]>(
      'task/tasks',
      'POST',
      task_specs
    ).then((res) => {
      if (!res.error) {
        setTasks(res.response);
      }
    });
  }, [task_specs]);

  return (
    <ComponentToPDF
      component={(ref) => (
        <div ref={ref}>
          <div className={styles.tournamentInfo}>
            {title}
            {description}
          </div>
          {tasks.map((task, index) => (
            <div className={styles.pageWrapper} key={index}>
              <Description task={task} setShowHint={() => false} />
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default memo(PrintTasks);
