import { FC, memo } from 'react';
import Description from '@components/Task/Description/Description';
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
