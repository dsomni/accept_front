import { ReactNode } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import AssignmentDashboard from '@components/Dashboard/AssignmentDashboard';
import { useLocale } from '@hooks/useLocale';
import Title from '@ui/Title/Title';

function AssignmentDashboardPage(props: { spec: string }) {
  const { locale } = useLocale();
  return (
    <>
      <Title title={locale.titles.dashboard.assignment} />
      <AssignmentDashboard spec={props.spec} />;
    </>
  );
}

AssignmentDashboardPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentDashboardPage;

const API_URL = getApiUrl();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const response = await fetch(
    `${API_URL}/api/assignment/${params.spec}`
  );
  if (response.status === 200) {
    const assignment = await response.json();
    return {
      props: { spec: assignment.spec },
      revalidate: 10 * 60,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/Not-Found',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
