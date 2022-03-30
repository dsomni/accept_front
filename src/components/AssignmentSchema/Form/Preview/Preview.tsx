import Description from '@components/AssignmentSchema/Description/Description';
import { FC, memo } from 'react';
import styles from './preview.module.css';

const Preview: FC<{ form: any }> = ({ form }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Description task={form.values} />
      </div>
    </>
  );
};

export default memo(Preview);
