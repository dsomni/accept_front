import AddNotification from '@components/Notification/Add';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactNode } from 'react';

function NewNotification() {
  return <AddNotification />;
}
NewNotification.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default NewNotification;
