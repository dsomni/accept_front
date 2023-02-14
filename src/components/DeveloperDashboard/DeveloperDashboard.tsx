import { useLocale } from '@hooks/useLocale';
import { FC, memo, useMemo } from 'react';
import {
  BellRinging,
  Terminal,
  UserExclamation,
} from 'tabler-icons-react';
import FeedbackList from './FeedbackList/FeedbackList';
import LeftMenu from '@ui/LeftMenu/LeftMenu';
import { IMenuLink } from '@custom-types/ui/IMenuLink';
import NotificationList from './NotificationList/NotificationList';
import Executor from './Executor/Executor';
// import styles from './developerDashboard.module.css'

const DeveloperDashboard: FC<{}> = ({}) => {
  const { locale } = useLocale();

  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: <FeedbackList />,
        icon: <UserExclamation color="var(--secondary)" />,
        title: locale.dashboard.developer.feedbackList,
      },
      {
        page: <NotificationList />,
        icon: <BellRinging color="var(--secondary)" />,
        title: locale.dashboard.developer.notificationList,
      },
      {
        page: <Executor />,
        icon: <Terminal color="var(--secondary)" />,
        title: locale.dashboard.developer.executor,
      },
    ],
    [locale]
  );
  return (
    <>
      <LeftMenu links={links} />
    </>
  );
};

export default memo(DeveloperDashboard);
