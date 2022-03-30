import { FC, memo, useMemo } from 'react';
import TaskSelector from '../TaskSelector/TaskSelector';
import styles from './taskAdding.module.css';

const TaskAdding: FC<{ form: any }> = ({ form }) => {
  const initialTasks = useMemo(
    () => {
      return form.values.tasks;
    },
    [form.values.spec] // eslint-disable-line
  );
  return (
    <>
      <div className={styles.wrapper}>
        <TaskSelector
          classNames={{
            label: styles.label,
          }}
          initialTasks={initialTasks}
          setUsed={(value) => form.setFieldValue('tasks', value)}
        />
      </div>
    </>
  );
};

export default memo(TaskAdding);
