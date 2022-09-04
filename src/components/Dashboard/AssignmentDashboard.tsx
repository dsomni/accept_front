import { FC, memo, useEffect, useMemo, useState } from 'react';
import Chat from '@components/Dashboard/Chat/Chat';
import Results from '@components/Dashboard/Results/Results';
import AttemptsList from '@components/Dashboard/AttemptsList/AttemptsList';
import styles from './dashboard.module.css';
import TimeInfo from '@components/Dashboard/TimeInfo/TimeInfo';
import {
  AlignRight,
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

const AssignmentDashboard: FC<{
  spec: string;
}> = ({ spec }) => {
  const { locale } = useLocale();

  const [assignment, setAssignment] = useState<IAssignmentDisplay>();

  const { data, refetch } = useRequest<undefined, IAssignmentDisplay>(
    `assignment/display/${spec}`,
    'GET'
  );

  useEffect(() => {
    if (data) setAssignment(data);
  }, [data]);

  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: assignment && (
          <div className={styles.mainInfo}>
            <TimeInfo assignment={assignment} refetch={refetch} />
            <Chat spec={spec} />
          </div>
        ),
        icon: <Database color="var(--secondary)" />,
        title: locale.dashboard.assignment.mainInfo,
      },
      {
        page: <Results spec={spec} />,
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
          <Sticky actions={actions} color={'--prime'} />
        </>
      )}
      <LeftMenu links={links} />
    </>
  );
};

export default memo(AssignmentDashboard);
