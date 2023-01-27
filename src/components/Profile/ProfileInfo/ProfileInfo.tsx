import { FC, memo } from 'react';
import styles from './profileInfo.module.css';
import { IFullProfileBundle } from '@custom-types/data/IProfileInfo';
import MainInfo from './MainInfo/MainInfo';
import GroupsInfo from './GroupsInfo/GroupsInfo';
import RatingInfo from './RatingInfo/RatingInfo';
import TaskInfo from './TaskInfo/TaskInfo';

const ProfileInfo: FC<IFullProfileBundle> = ({
  user,
  attempt_info,
  task_info,
  rating_info,
}) => {
  return (
    <div className={styles.wrapper}>
      <MainInfo user={user} />
      <RatingInfo {...rating_info} />
      <GroupsInfo user={user} />
      <TaskInfo {...task_info} />
    </div>
  );
};

export default memo(ProfileInfo);
