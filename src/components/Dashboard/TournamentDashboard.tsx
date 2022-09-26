import { FC, memo, useEffect, useMemo, useState } from 'react';
import {
  AlignRight,
  Pencil,
  Puzzle,
  Trash,
  Users,
  Vocabulary,
} from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import { ITournamentDisplay } from '@custom-types/data/ITournament';
import { IMenuLink } from '@custom-types/ui/IMenuLink';
import LeftMenu from '@ui/LeftMenu/LeftMenu';
import { useUser } from '@hooks/useUser';
import { useWidth } from '@hooks/useWidth';
import { STICKY_SIZES } from '@constants/Sizes';
import DeleteModal from '@components/Tournament/DeleteModal/DeleteModal';
import Sticky from '@ui/Sticky/Sticky';
import { useRequest } from '@hooks/useRequest';
import ChatSticky from '@ui/ChatSticky/ChatSticky';
import { useInterval } from '@mantine/hooks';
import TimeInfo from '@components/Dashboard/TimeInfo/TimeInfo';
import ParticipantsList from '@components/Dashboard/ParticipantsList/ParticipantsList';
import TaskList from './TaskList/TaskList';
import AttemptsList from '@components/Dashboard/AttemptsList/AttemptsList';

const TournamentDashboard: FC<{
  spec: string;
}> = ({ spec }) => {
  const { locale } = useLocale();

  const [tournament, setTournament] = useState<ITournamentDisplay>();

  const { data, refetch } = useRequest<undefined, ITournamentDisplay>(
    `tournament/display/${spec}`,
    'GET'
  );

  const refetchTournament = useInterval(
    () => refetch(false),
    60 * 1000
  );

  useEffect(() => {
    refetchTournament.start();
    return refetchTournament.stop;
  }, []); // eslint-disable-line

  useEffect(() => {
    if (data) setTournament(data);
  }, [data]);

  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: tournament && (
          <TimeInfo
            type={'tournament'}
            entity={{ ...tournament, starter: tournament.author }}
            timeInfo={{
              start: tournament.start,
              end: tournament.end,
              status: tournament.status.spec as 0 | 1 | 2,
            }}
            refetch={refetch}
          />
        ),
        icon: <Vocabulary color="var(--secondary)" />,
        title: locale.dashboard.tournament.mainInfo,
      },
      // {
      //   page: tournament && (
      //     <Results
      //       spec={spec}
      //       isFinished={
      //         !tournament.infinite && tournament.status.spec == 2
      //       }
      //       endDate={tournament.end}
      //     />
      //   ),
      //   icon: <Table color="var(--secondary)" />,
      //   title: locale.dashboard.tournament.results,
      // },
      {
        page: tournament && (
          <AttemptsList
            type={'tournament'}
            spec={tournament.spec}
            shouldNotRefetch={tournament.status.spec != 1}
          />
        ),
        icon: <AlignRight color="var(--secondary)" />,
        title: locale.dashboard.tournament.attempts,
      },
      {
        page: <ParticipantsList type={'tournament'} spec={spec} />,
        icon: <Users color="var(--secondary)" />,
        title: locale.dashboard.tournament.participants,
      },
      {
        page: <TaskList type={'tournament'} spec={spec} />,
        icon: <Puzzle color="var(--secondary)" />,
        title: locale.dashboard.tournament.tasks,
      },
      // {
      //   page: tournament && (
      //     <CreateNotification
      //       groups={tournament.groups.map((group) => group.spec)}
      //     />
      //   ),
      //   icon: <BellPlus color="var(--secondary)" />,
      //   title: locale.dashboard.tournament.createNotification,
      // },
    ],
    [tournament, locale, refetch, spec]
  );

  const [activeModal, setActiveModal] = useState(false);

  const { isTeacher } = useUser();
  const { width } = useWidth();

  const actions = [
    {
      color: 'green',
      icon: (
        <Pencil
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      href: `/tournament/edit/${spec}`,
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
      {isTeacher && (
        <>
          {tournament && (
            <DeleteModal
              active={activeModal}
              setActive={setActiveModal}
              tournament={tournament}
            />
          )}
          <Sticky actions={actions} />
        </>
      )}
      <ChatSticky spec={spec} />
      <LeftMenu links={links} />
    </>
  );
};

export default memo(TournamentDashboard);
