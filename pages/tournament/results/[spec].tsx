import { ReactNode } from 'react';
import { DefaultLayout } from '@layouts/DefaultLayout';
import Results from '@components/Dashboard/Results/Results';
import { ITournament } from '@custom-types/data/ITournament';
import { GetServerSideProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { useUser } from '@hooks/useUser';

function Tournament({ tournament }: { tournament: ITournament }) {
  const { user, isTeacher } = useUser();

  return (
    <>
      <Results
        spec={tournament.spec}
        type={'tournament'}
        isFinished={tournament.status.spec == 2}
        endDate={tournament.end}
        full={
          isTeacher ||
          (!!user && user?.login in tournament.moderators)
        }
      />
    </>
  );
}

Tournament.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Tournament;
const API_URL = getApiUrl();

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  if (!query.spec) {
    return {
      redirect: {
        permanent: false,
        destination: '/Not-Found',
      },
    };
  }
  const spec = query.spec;

  const response = await fetch(`${API_URL}/api/tournament/${spec}`, {
    headers: req.headers as { [key: string]: string },
  });

  if (response.status === 200) {
    const tournament = await response.json();
    return {
      props: {
        tournament,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/Not-Found',
    },
  };
};
