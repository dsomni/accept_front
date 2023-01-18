import { ReactNode } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import AssignmentDashboard from '@components/Dashboard/AssignmentDashboard';
import { useLocale } from '@hooks/useLocale';
import Title from '@ui/Title/Title';
import { REVALIDATION_TIME } from '@constants/PageRevalidation';

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
    return {
      props: { spec: params.spec },
      revalidate: REVALIDATION_TIME.dashboard.assignment,
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
