import { ReactNode, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useUser } from '@hooks/useUser';
import { useWidth } from '@hooks/useWidth';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import Sticky from '@ui/Sticky/Sticky';
import DeleteModal from '@components/Tournament/DeleteModal/DeleteModal';
import Description from '@components/Tournament/Description/Description';
import {
  Dashboard,
  Pencil,
  PlaylistAdd,
  Trash,
} from 'tabler-icons-react';
import { STICKY_SIZES } from '@constants/Sizes';
import { ITournament } from '@custom-types/data/ITournament';
import Title from '@ui/Title/Title';
import { useLocale } from '@hooks/useLocale';
import Timer from '@ui/Timer/Timer';
import ChatSticky from '@ui/ChatSticky/ChatSticky';

function Tournament(props: { tournament: ITournament }) {
  const tournament = props.tournament;
  const [activeModal, setActiveModal] = useState(false);
  const { locale } = useLocale();

  const { isAdmin, user } = useUser();
  const { width } = useWidth();

  const special = useMemo(
    () =>
      isAdmin ||
      tournament.moderators.includes(user?.login || '') ||
      tournament.author == user?.login,
    [isAdmin, tournament.author, tournament.moderators, user?.login]
  );

  const actions = [
    {
      color: 'grape',
      icon: (
        <Dashboard
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      href: `/dashboard/tournament/${tournament.spec}`,
    },
    {
      color: 'green',
      icon: (
        <PlaylistAdd
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      href: `/task/add?tournament=${tournament.spec}`,
    },
    {
      color: 'green',
      icon: (
        <Pencil
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      href: `/tournament/edit/${tournament.spec}`,
    },

    {
      color: 'red',
      icon: (
        <Trash
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      onClick: () => setActiveModal(true),
    },
  ];

  return (
    <>
      <Title
        title={`${locale.titles.tournament.spec} ${tournament.title}`}
      />
      <DeleteModal
        active={activeModal}
        setActive={setActiveModal}
        tournament={{
          ...tournament,
        }}
      />
      {special && <Sticky actions={actions} />}
      {(special ||
        tournament.participants.includes(user?.login || '')) && (
        <ChatSticky spec={tournament.spec} />
      )}
      <Timer url={`tournament/info/${tournament.spec}`} />
      <Description tournament={tournament} />
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
    // res.setHeader(
    //   'Cache-Control',
    //   'public, s-maxage=10, stale-while-revalidate=59'
    // );
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
