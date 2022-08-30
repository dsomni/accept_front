import { ReactNode } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { IAssignmentResults } from '@custom-types/data/IAssignment';
import AssignmentDashboard from '@components/Dashboard/AssignmentDashboard';

function AssignmentDashboardPage(props: {
  spec: string;
  results: IAssignmentResults;
}) {
  console.log(props.results);
  return (
    <AssignmentDashboard spec={props.spec} results={props.results} />
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
    `${API_URL}/api/assignment-results/${params.spec}`
  );
  if (response.status === 200) {
    const results = await response.json();
    return {
      props: { spec: params.spec, results },
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
