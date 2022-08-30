import { FC, ReactNode, memo, useMemo, useState } from 'react';
import { IUser } from '@custom-types/data/IUser';
import { Avatar, Navbar } from '@mantine/core';
import ProfileInfo from '@components/Profile/ProfileInfo/ProfileInfo';
import AttemptListProfile from '@components/Profile/AttemptListProfile/AttemptListProfile';
import {
  Alarm,
  AlignRight,
  BellPlus,
  BellRinging,
  Robot,
  Settings as SettingsIcon,
} from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import NotificationList from '@components/Notification/List/NotificationList';
import { link } from '@constants/Avatar';
import { useBackNotifications } from '@hooks/useBackNotifications';
import { Indicator } from '@ui/basics';
import styles from './profile.module.css';
import Settings from '@components/Profile/Settings/Settings';
import AssignmentList from '@components/Profile/AssignmentList/AssignmentList';
import CreateNotification from '@components/Profile/CreateNotification/CreateNotification';
import ProfileLink from './ProfileLInk/ProfileLink';

interface IProfileLink {
  page: ReactNode;
  icon: ReactNode;
  title: string;
}

const Profile: FC<{ user: IUser }> = ({ user }) => {
  const [current, setCurrent] = useState(0);

  const { amount } = useBackNotifications();

  const { locale } = useLocale();

  const links: IProfileLink[] = useMemo(() => {
    let globalLinks = [
      {
        page: <ProfileInfo user={user} />,
        icon: <Robot color="var(--secondary)" />,
        title: locale.profile.profile,
      },
      {
        page: <NotificationList />,
        icon: (
          <Indicator disabled={amount <= 0} size={8}>
            <BellRinging color="var(--secondary)" />
          </Indicator>
        ),
        title: locale.profile.notification,
      },
      {
        page: <AssignmentList />,
        icon: <Alarm color="var(--secondary)" />,
        title: locale.profile.assignments,
      },
      {
        page: <AttemptListProfile />,
        icon: <AlignRight color="var(--secondary)" />,
        title: locale.profile.attempts,
      },
      {
        page: <Settings user={user} />,
        icon: <SettingsIcon color="var(--secondary)" />,
        title: locale.profile.settings,
      },
    ];
    if (user.role.accessLevel > 1) {
      globalLinks.splice(4, 0, {
        page: <CreateNotification />,
        icon: <BellPlus color="var(--secondary)" />,
        title: locale.profile.createNotification,
      });
    }
    return globalLinks;
  }, [user, locale, amount]);

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
          {links.map((element, idx) => (
            <ProfileLink
              key={idx}
              link={{
                icon: element.icon,
                title: element.title,
              }}
              isActive={current === idx}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </Navbar.Section>
      </Navbar>
      <div className={styles.contentWrapper}>
        {links[current].page}
      </div>
    </div>
  );
};

export default memo(Profile);
