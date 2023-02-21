import { FC, memo, useMemo } from 'react';
import { Avatar } from '@mantine/core';
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
import LeftMenu from '@ui/LeftMenu/LeftMenu';
import { IMenuLink } from '@custom-types/ui/IMenuLink';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { IFullProfileBundle } from '@custom-types/data/IProfileInfo';
import { useWidth } from '@hooks/useWidth';

const Profile: FC<IFullProfileBundle> = ({
  user,
  attempt_info,
  task_info,
  rating_info,
}) => {
  const { new_amount } = useBackNotifications();
  const router = useRouter();

  const { locale } = useLocale();

  const { isTeacher } = useUser();

  const { tabletLandscapeUp } = useWidth();

  const links: IMenuLink[] = useMemo(() => {
    let globalLinks = [
      {
        page: (
          <ProfileInfo
            user={user}
            attempt_info={attempt_info}
            task_info={task_info}
            rating_info={rating_info}
          />
        ),
        icon: <Robot color="var(--secondary)" />,
        title: locale.profile.profile,
      },
      {
        page: <NotificationList />,
        icon: (
          <Indicator disabled={new_amount <= 0} size={8}>
            <BellRinging color="var(--secondary)" />
          </Indicator>
        ),
        title: locale.profile.notification,
        section: 'notifications',
      },
      {
        page: <AssignmentList />,
        icon: <Alarm color="var(--secondary)" />,
        title: locale.profile.assignments,
        section: 'assignments',
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
    if (isTeacher) {
      globalLinks.splice(4, 0, {
        page: <CreateNotification />,
        icon: <BellPlus color="var(--secondary)" />,
        title: locale.profile.createNotification,
      });
    }
    return globalLinks;
  }, [
    user,
    attempt_info,
    task_info,
    rating_info,
    locale,
    new_amount,
    isTeacher,
  ]);

  const initialStep = useMemo(() => {
    let section = router.query.section as string;
    if (!section) return 0;
    let idx = links.findIndex(
      (element) => element.section == section
    );
    return idx > 0 ? idx : 0;
  }, [links, router.query.section]);

  return (
    <LeftMenu
      links={links}
      initialStep={initialStep}
      hideTitles={!tabletLandscapeUp}
      topContent={
        tabletLandscapeUp && (
          <div className={styles.header}>
            <Avatar src={link(user.login)} size="lg" radius="lg" />
            <div className={styles.shortInfo}>
              <div className={styles.shortName}>{user.shortName}</div>
              <div className={styles.login}>{user.login}</div>
            </div>
          </div>
        )
      }
    />
  );
};

export default memo(Profile);
