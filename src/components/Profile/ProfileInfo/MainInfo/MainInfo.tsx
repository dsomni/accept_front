import { IUser } from '@custom-types/data/IUser';
import { Avatar, Badge } from '@mantine/core';
import { link } from '@constants/Avatar';
import { FC, memo } from 'react';
import styles from './mainInfo.module.css';

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

const MainInfo: FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className={styles.main}>
      <Avatar src={link(user.login)} size="xl" radius="lg" />
      <div className={styles.text}>
        <div className={styles.nameWrapper}>
          <div className={styles.fullName}>
            <span className={styles.name}>{user.surname}</span>
            <span className={styles.name}>{user.name}</span>
            {user.patronymic.length > 0 && (
              <span className={styles.name}>{user.patronymic}</span>
            )}
          </div>
          <Badge
            style={{
              color: getRoleColor(user.role.accessLevel),
              background: `${getRoleColor(user.role.accessLevel)}30`,
            }}
          >
            {user.role.name}
          </Badge>
        </div>
        <div className={styles.login}>{user.login}</div>
      </div>
    </div>
  );
};

export default memo(MainInfo);
