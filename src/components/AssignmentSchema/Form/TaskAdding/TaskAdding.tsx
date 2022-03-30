import { Item } from '@components/CustomTransferList/CustomTransferList';
import { FC, memo, useMemo, useState } from 'react';
import TaskSelector from '../TaskSelector/TaskSelector';
import styles from './taskAdding.module.css';

const TaskAdding: FC<{ form: any; initialTasks: Item[] }> = ({
  form,
  initialTasks,
}) => {
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
