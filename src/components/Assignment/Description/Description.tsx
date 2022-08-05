import { FC, memo } from 'react';
import styles from './description.module.css';
import { IAssignment } from '@custom-types/data/IAssignment';
import { getLocalDate } from '@utils/datetime';

const Description: FC<{ assignment: IAssignment }> = ({
  assignment,
}) => {
  return (
    <div>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{assignment.title}</div>
        <div className={styles.info}>
          <div className={styles.author}>{assignment.author}</div>
          <div className={styles.starter}>{assignment.starter}</div>
          {assignment.infinite ? (
            <div className={styles.duration}>Infinite</div>
          ) : (
            <div>
              <div className={styles.duration}>
                {getLocalDate(assignment.start || new Date())}
              </div>
              <div className={styles.duration}>
                {getLocalDate(assignment.end || new Date())}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.description}>
        {assignment.description}
      </div>
      <div className={styles.tasksWrapper}>
        {assignment.tasks.map((task, index) => (
          <div key={index}>task.title</div>
        ))}
      </div>
    </div>
  );
};

export default memo(Description);
