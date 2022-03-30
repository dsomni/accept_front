import { CustomDraggableList } from '@components/CustomDraggableList/CustomDraggableList';
import { FC } from 'react';
import styles from './taskOrdering.module.css';

export const TaskOrdering: FC<{
  form: any;
}> = ({ form }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>Выберете порядок задач</div>
      <CustomDraggableList
        values={form.values.tasks}
        setValues={(values) => form.setFieldValue('tasks', values)}
        classNames={{
          wrapper: styles.wrapperList,
          label: styles.label,
          itemWrapper: styles.itemWrapper,
          dragButton: styles.dragButton,
        }}
      />
    </div>
  );
};
