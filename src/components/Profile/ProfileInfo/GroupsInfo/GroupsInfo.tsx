import { IUser } from '@custom-types/data/IUser';
import { useLocale } from '@hooks/useLocale';
import { Badge } from '@mantine/core';
import { FC, memo } from 'react';
import styles from './groupsInfo.module.css';

const GroupsInfo: FC<{ user: IUser }> = ({ user }) => {
  const { locale } = useLocale();
  return (
    <div className={styles.wrapper}>
      <div className={styles.groupSection}>
        <span className={styles.groupTitle}>
          {' '}
          {`${locale.profile.groups}:`}
        </span>
        {user.groups.map((group, index) => (
          <Badge key={index} size="lg">
            {group.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default memo(GroupsInfo);
