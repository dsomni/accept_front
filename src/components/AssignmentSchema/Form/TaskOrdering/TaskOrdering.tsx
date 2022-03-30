import { CustomDraggableList } from '@components/CustomDraggableList/CustomDraggableList';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC } from 'react';
import styles from './taskOrdering.module.css';

export const TaskOrdering: FC<{
  form: any;
}> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {capitalize(locale.assignmentSchema.form.taskOrdering.title)}
      </div>
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
