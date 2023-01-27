import { IRatingInfo } from '@custom-types/data/IProfileInfo';
import { FC, memo } from 'react';
import styles from './ratingInfo.module.css';

const RatingInfo: FC<IRatingInfo> = ({ score, place }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Rating</div>
      <div className={styles.info}>
        <div>Score - {score}</div>
        <div>Place - {place}</div>
      </div>
    </div>
  );
};

export default memo(RatingInfo);
