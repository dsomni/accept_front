import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import TaskSelector from '../TaskSelector/TaskSelector';
import styles from './taskAdding.module.css';

const TaskAdding: FC<{ form: any; initialTasks: Item[] }> = ({
  form,
  initialTasks,
}) => {
  useEffect(() => {
    console.log(initialTasks)
  }, [initialTasks])
  return (
    <>
      <div className={styles.wrapper}>
        <TaskSelector
          classNames={{
            label: styles.label,
          }}
          initialTasks={initialTasks}
          setUsed={(value) => {
            form.setFieldValue('tasks', value);
          }}
        />
      </div>
    </>
  );
};

export default memo(TaskAdding);
