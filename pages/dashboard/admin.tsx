import { ReactNode } from 'react';

import { DefaultLayout } from '@layouts/DefaultLayout';

import AdminDashboard from '@components/AdminDashboard/AdminDashboard';

function AdminDashboardPage() {
  return <AdminDashboard />;
}

AdminDashboardPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AdminDashboardPage;
