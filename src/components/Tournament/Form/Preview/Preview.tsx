import { FC, memo } from 'react';
import Description from '@components/Tournament/Description/Description';
import styles from './preview.module.css';

const Preview: FC<{ form: any }> = ({ form }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Description tournament={form.values} />
      </div>
    </>
  );
};

export default memo(Preview);
