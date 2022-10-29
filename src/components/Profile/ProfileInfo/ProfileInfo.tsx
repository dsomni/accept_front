import { FC, memo } from 'react';
import styles from './profileInfo.module.css';
import { IUser } from '@custom-types/data/IUser';
import { Avatar, Badge } from '@mantine/core';
import { link } from '@constants/Avatar';
import { useLocale } from '@hooks/useLocale';

const getRoleColor = (accessLevel: number) => {
  switch (accessLevel) {
    case 1:
      return '#2ea3f2';
    case 2:
      return '#1c7ed6';
    case 3:
      return '#aa00ff';
    default:
      return '#ff5050';
  }
};

const ProfileInfo: FC<{ user: IUser }> = ({ user }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Avatar src={link(user.login)} size="xl" radius="lg" />
        <div className={styles.text}>
          <div className={styles.nameWrapper}>
            <div className={styles.fullName}>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.name}>{user.surname}</span>
              {user.patronymic.length > 0 && (
                <span className={styles.name}>{user.patronymic}</span>
              )}
            </div>
            <Badge
              style={{
                color: getRoleColor(user.role.accessLevel),
                background: `${getRoleColor(
                  user.role.accessLevel
                )}30`,
              }}
            >
              {user.role.name}
            </Badge>
          </div>
          <div className={styles.login}>{user.login}</div>
        </div>
      </div>
      <div className={styles.restInfo}>
        {user.email && (
          <div
            className={styles.email}
          >{`${locale.email}: ${user.email}`}</div>
        )}
        {user.groups.length > 0 && (
          <div className={styles.groupSection}>
            <div className={styles.groupTitle}>
              {' '}
              {`${locale.profile.groups}:`}
            </div>
            <div className={styles.groupList}>
              {user.groups.map((group, index) => (
                <Badge key={index} size="lg">
                  {group.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProfileInfo);
