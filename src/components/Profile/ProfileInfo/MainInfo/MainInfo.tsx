import { IUser } from '@custom-types/data/IUser';
import { Avatar, Badge } from '@mantine/core';
import { link } from '@constants/Avatar';
import { FC, memo } from 'react';
import styles from './mainInfo.module.scss';
import { Medal2 } from 'tabler-icons-react';
import { useWidth } from '@hooks/useWidth';

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

const getRatingColor = (rating: number) => {
  switch (rating) {
    case 1:
      return '#FFD700';
    case 2:
      return '#C0C0C0';
    case 3:
      return '#CD7f32';
    default:
      return '';
  }
};

const MainInfo: FC<{ user: IUser; place?: number }> = ({
  ...props
}) => {
  const { tabletLandscapeUp } = useWidth();
  return (
    <>
      {tabletLandscapeUp ? (
        <DesktopVariant {...props} />
      ) : (
        <MobileVariant {...props} />
      )}
    </>
  );
};

const DesktopVariant: FC<{ user: IUser; place?: number }> = ({
  user,
  place,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.avatarWrapper}>
        <Avatar src={link(user.login)} size="xl" radius="lg" />
        {place && place < 4 && (
          <Medal2
            strokeWidth={0.8}
            size={'45px'}
            fill={getRatingColor(place)}
            className={styles.medal}
          />
        )}
      </div>
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

const MobileVariant: FC<{ user: IUser; place?: number }> = ({
  user,
  place,
}) => {
  const { tabletLandscapeUp } = useWidth();

  return (
    <div className={styles.main}>
      <div className={styles.mobileTopWrapper}>
        <div className={styles.avatarWrapper}>
          <Avatar
            src={link(user.login)}
            size={tabletLandscapeUp ? 'xl' : 'lg'}
            radius="lg"
          />
          {place && place < 4 && (
            <Medal2
              strokeWidth={0.8}
              size={'45px'}
              fill={getRatingColor(place)}
              className={styles.medal}
            />
          )}
        </div>
        <div className={styles.text}>
          <div className={styles.login}>{user.login}</div>
          <Badge
            style={{
              color: getRoleColor(user.role.accessLevel),
              background: `${getRoleColor(user.role.accessLevel)}30`,
            }}
          >
            {user.role.name}
          </Badge>
        </div>
      </div>
      <div className={styles.fullName}>
        <span className={styles.name}>{user.surname}</span>
        <span className={styles.name}>{user.name}</span>
        {user.patronymic.length > 0 && (
          <span className={styles.name}>{user.patronymic}</span>
        )}
      </div>
    </div>
  );
};

export default memo(MainInfo);
