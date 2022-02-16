import { FC, memo } from 'react';
import Language from './Language';
import styles from './language.module.css';

const LocationInfo: FC = () => {
  return (
    <div className={styles.languageInfo}>
      <Language />
    </div>
  );
};

export default memo(LocationInfo);
