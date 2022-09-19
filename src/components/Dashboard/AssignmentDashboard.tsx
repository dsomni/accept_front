import { FC, memo, useEffect, useMemo, useState } from 'react';
import Results from '@components/Dashboard/Results/Results';
import AttemptsList from '@components/Dashboard/AttemptsList/AttemptsList';
import TimeInfo from '@components/Dashboard/TimeInfo/TimeInfo';
import {
  AlignRight,
  BellPlus,
  Database,
  Pencil,
  Puzzle,
  Table,
  Trash,
  Users,
} from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import { IAssignmentDisplay } from '@custom-types/data/IAssignment';
import { IMenuLink } from '@custom-types/ui/IMenuLink';
import LeftMenu from '@ui/LeftMenu/LeftMenu';
import ParticipantsList from '@components/Dashboard/ParticipantsList/ParticipantsList';
import TaskList from './TaskList/TaskList';
import { useUser } from '@hooks/useUser';
import { useWidth } from '@hooks/useWidth';
import { STICKY_SIZES } from '@constants/Sizes';
import DeleteModal from '@components/Assignment/DeleteModal/DeleteModal';
import Sticky from '@ui/Sticky/Sticky';
import { useRequest } from '@hooks/useRequest';
import ChatSticky from '@ui/ChatSticky/ChatSticky';
import { useInterval } from '@mantine/hooks';
import CreateNotification from './CreateNotification/CreateNotification';

const AssignmentDashboard: FC<{
  spec: string;
}> = ({ spec }) => {
  const { locale } = useLocale();

  const [assignment, setAssignment] = useState<IAssignmentDisplay>();

  const { data, refetch } = useRequest<undefined, IAssignmentDisplay>(
    `assignment/display/${spec}`,
    'GET'
  );

  const refetchAssignment = useInterval(
    () => refetch(false),
    60 * 1000
  );

  useEffect(() => {
    refetchAssignment.start();
    return refetchAssignment.stop;
  }, []); // eslint-disable-line

  useEffect(() => {
    if (data) setAssignment(data);
  }, [data]);

  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: assignment && (
          <TimeInfo assignment={assignment} refetch={refetch} />
        ),
        icon: <Database color="var(--secondary)" />,
        title: locale.dashboard.assignment.mainInfo,
      },
      {
        page: assignment && (
          <Results
            spec={spec}
            isFinished={
              !assignment.infinite && assignment.status.spec == 2
            }
            endDate={assignment.end}
          />
        ),
        icon: <Table color="var(--secondary)" />,

        title: locale.dashboard.assignment.results,
      },
      {
        page: assignment && (
          <AttemptsList
            spec={assignment.spec}
            shouldNotRefetch={assignment.status.spec != 1}
          />
        ),
        icon: <AlignRight color="var(--secondary)" />,
        title: locale.dashboard.assignment.attempts,
      },
      {
        page: <ParticipantsList spec={spec} />,
        icon: <Users color="var(--secondary)" />,
        title: locale.dashboard.assignment.participants,
      },
      {
        page: <TaskList spec={spec} />,
        icon: <Puzzle color="var(--secondary)" />,
        title: locale.dashboard.assignment.tasks,
      },
      {
        page: assignment && (
          <CreateNotification
            groups={assignment.groups.map((group) => group.spec)}
          />
        ),
        icon: <BellPlus color="var(--secondary)" />,
        title: locale.dashboard.assignment.createNotification,
      },
    ],
    [assignment, locale, refetch, spec]
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
      href: `/edu/assignment/edit/${spec}`,
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
          {assignment && (
            <DeleteModal
              active={activeModal}
              setActive={setActiveModal}
              assignment={assignment}
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

export default memo(AssignmentDashboard);
