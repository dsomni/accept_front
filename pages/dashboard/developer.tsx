import { ReactNode } from 'react';
import { DefaultLayout } from '@layouts/DefaultLayout';
import DeveloperDashboard from '@components/DeveloperDashboard/DeveloperDashboard';
import { useLocale } from '@hooks/useLocale';
import Title from '@ui/Title/Title';

function DeveloperDashboardPage() {
  const { locale } = useLocale();

  return (
    <>
      <Title title={locale.titles.dashboard.admin} />
      <DeveloperDashboard />
    </>
  );
}

DeveloperDashboardPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default DeveloperDashboardPage;
