import { FC, memo } from 'react';
import { ITaskDisplay } from '@custom-types/ITask';
import styles from './taskDescription.module.css';

const TaskDescription: FC<{ task: ITaskDisplay }> = ({ task }) => {
  return (
    <div className={styles.wrapper}>
      <div>{task.title}</div>
      <p>{task.description}</p>
    </div>
  );
};

export default memo(TaskDescription);
