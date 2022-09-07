import { IAttempt } from '@custom-types/data/IAttempt';
import { FC, memo } from 'react';
import styles from './code.module.css';

const Code: FC<{ attempt: IAttempt }> = ({ attempt }) => {
  return (
    <div className={styles.codeWrapper}>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {attempt.programText}
      </div>
    </div>
  );
};

export default memo(Code);
