import { FC, memo } from 'react';
import styles from './taskAdding.module.css';

const TaskAdding: FC<{ form: any }> = ({ form }) => {
  return (
    <>
      <div className={styles.wrapper}></div>
    </>
  );
};

export default memo(TaskAdding);
