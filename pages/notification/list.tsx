import { ReactNode } from 'react';
import { DefaultLayout } from '@layouts/DefaultLayout';

import NotificationList from '@components/Notification/List/NotificationList';

function List() {
  return <NotificationList />;
}

List.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default List;
