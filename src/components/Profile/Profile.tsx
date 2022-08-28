import { FC, memo, useEffect, useMemo, useState } from 'react';
import styles from './profile.module.css';
import { IUser } from '@custom-types/data/IUser';
import { Avatar, Navbar, Divider, AppShell } from '@mantine/core';
import ProfileLink from '@components/Profile/ProfileLInk/ProfileLink';
import ProfileInfo from '@components/Profile/ProfileInfo/ProfileInfo';
import {
  Bell,
  Robot,
  Alarm,
  Settings,
  AlignRight,
} from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import NotificationList from '@components/Notification/List/NotificationList';
import { link } from '@constants/Avatar';
import { useBackNotifications } from '@hooks/useBackNotifications';
import { Indicator } from '@ui/basics';
import AttemptList from '@ui/AttemptList/AttemptList';

const Profile: FC<{ user: IUser }> = ({ user }) => {
  const [current, setCurrent] = useState(0);

  const { amount } = useBackNotifications();

  const { locale } = useLocale();

  const pages = useMemo(
    () => [
      <ProfileInfo user={user} key={0} />,
      <NotificationList key={1} />,
      <div key={3} />,
      <AttemptList url={`attempt/my`} activeTab key={2} />,
      <div key={4} />,
    ],
    [user]
  );

  return (
    <div className={styles.wrapper}>
      <Navbar p="xs" width={{ base: 300 }} withBorder={false}>
        <Navbar.Section className={styles.header}>
          <Avatar src={link(user.login)} size="lg" radius="lg" />
          <div className={styles.shortInfo}>
            <div className={styles.shortName}>{user.shortName}</div>
            <div className={styles.login}>{user.login}</div>
          </div>
        </Navbar.Section>
        <Navbar.Section grow mt="md">
          <ProfileLink
            link={{
              icon: <Robot color="var(--secondary)" />,
              title: locale.profile.profile,
            }}
            isActive={current === 0}
            onClick={() => setCurrent(0)}
          />
          <ProfileLink
            link={{
              icon: (
                <Indicator disabled={amount <= 0} size={8}>
                  <Bell color="var(--secondary)" />
                </Indicator>
              ),
              title: locale.profile.notification,
            }}
            isActive={current === 1}
            onClick={() => setCurrent(1)}
          />
          <ProfileLink
            link={{
              icon: <Alarm color="var(--secondary)" />,
              title: locale.profile.assignments,
            }}
            isActive={current === 2}
            onClick={() => setCurrent(2)}
          />
          <ProfileLink
            link={{
              icon: <AlignRight color="var(--secondary)" />,
              title: locale.profile.attempts,
            }}
            isActive={current === 3}
            onClick={() => setCurrent(3)}
          />
          <ProfileLink
            link={{
              icon: <Settings color="var(--secondary)" />,
              title: locale.profile.settings,
            }}
            isActive={current === 4}
            onClick={() => setCurrent(4)}
          />
        </Navbar.Section>
      </Navbar>
      <div className={styles.contentWrapper}>{pages[current]}</div>
    </div>
  );
};

export default memo(Profile);
