import { FC, memo } from 'react';
import styles from './timeInfo.module.css';

const TimeInfo: FC<{}> = ({}) => {
  return <div className={styles.wrapper}>Today</div>;
};

export default memo(TimeInfo);
