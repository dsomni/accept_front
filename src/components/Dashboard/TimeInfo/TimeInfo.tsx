import { IAssignment } from '@custom-types/data/IAssignment';
import { FC, memo } from 'react';
import styles from './timeInfo.module.css';

const TimeInfo: FC<{ assignment: IAssignment }> = ({
  assignment,
}) => {
  return <div className={styles.wrapper}>Today</div>;
};

export default memo(TimeInfo);
