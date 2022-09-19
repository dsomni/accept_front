import { ReactNode } from 'react';

import { DefaultLayout } from '@layouts/DefaultLayout';

import AdminDashboard from '@components/AdminDashboard/AdminDashboard';
import { useLocale } from '@hooks/useLocale';
import Title from '@ui/Title/Title';

function AdminDashboardPage() {
  const { locale } = useLocale();
  return (
    <>
      <Title title={locale.titles.dashboard.admin} />
      <AdminDashboard />;
    </>
  );
}

AdminDashboardPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AdminDashboardPage;
