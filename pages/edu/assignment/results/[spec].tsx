import { ReactNode } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { IAssignmentResults } from '@custom-types/data/IAssignment';
import ResultsTable from '@ui/ResultsTable/ResultsTable';

function AssignmentResults(props: {
  spec: string;
  results: IAssignmentResults;
}) {
  const spec = props.spec;
  const resultsData = props.results;
  return (
    <div
      style={{
        margin: 'var(--spacer-xl) auto 0 var(--spacer-s)',
        width: 'max-content',
      }}
    >
      <ResultsTable
        columns={resultsData.tasks.map((task) => ({
          text: task.title,
          href: `/task/${task.spec}?assignment=${spec}`,
        }))}
        rows={resultsData.users.map((user) => ({
          text: user.shortName,
          href: `/profile/${user.login}`,
        }))}
        data={resultsData.results.map((row) =>
          row.map((cell) => ({
            best: cell.best
              ? cell.best.status.spec === 2
                ? `${cell.best.verdict.verdict.shortText} #${
                    cell.best.verdict.test + 1
                  }`
                : cell.best.status.spec === 1
                ? 'TS'
                : 'TS'
              : '-',
            rest: cell.attempts.map((attempt) => ({
              text: attempt.verdict
                ? `${attempt.verdict.verdict.shortText} #${
                    attempt.verdict.test + 1
                  }`
                : 'TS',
              href: `/attempt/${attempt.spec}`,
            })),
          }))
        )}
      />
    </div>
  );
}

AssignmentResults.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentResults;

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
