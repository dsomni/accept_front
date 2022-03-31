import Description from '@components/AssignmentSchema/Description/Description';
import { FC, memo } from 'react';
import styles from './preview.module.css';

const Preview: FC<{ form: any }> = ({ form }) => {
  const assignment = {
    ...form.values,
    tasks: form.values.tasks.map((task: any) => task.value),
  };
  return (
    <>
      <div className={styles.wrapper}>
        <Description assignment={assignment} />
      </div>
    </>
  );
};

export default memo(Preview);
