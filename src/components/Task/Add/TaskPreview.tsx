import { ITaskDisplay } from '@custom-types/ITask';
import { FC, memo } from 'react';
import TaskDescription from '../TaskDescription';
import styles from './taskPreview.module.css';

const TaskPreview: FC<{ form: any }> = ({ form }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <TaskDescription task={form.values} />
      </div>
    </>
  );
};

export default memo(TaskPreview);
