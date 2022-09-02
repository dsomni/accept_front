import { FC, memo, useMemo } from 'react';
import Chat from '@components/Dashboard/Chat/Chat';
import Results from '@components/Dashboard/Results/Results';
import AttemptsList from '@components/Dashboard/AttemptsList/AttemptsList';
import styles from './dashboard.module.css';
import TimeInfo from '@components/Dashboard/TimeInfo/TimeInfo';
import { AlignRight, Database, Table } from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import { IAssignment } from '@custom-types/data/IAssignment';
import { IMenuLink } from '@custom-types/ui/IMenuLink';
import LeftMenu from '@ui/LeftMenu/LeftMenu';

const AssignmentDashboard: FC<{
  assignment: IAssignment;
}> = ({ assignment }) => {
  const { locale } = useLocale();
  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: (
          <div className={styles.mainInfo}>
            <TimeInfo assignment={assignment} />
            <Chat spec={assignment.spec} />
          </div>
        ),
        icon: <Database color="var(--secondary)" />,
        title: locale.dashboard.assignment.mainInfo,
      },
      {
        page: <Results spec={assignment.spec} />,
        icon: <Table color="var(--secondary)" />,

        title: locale.dashboard.assignment.results,
      },
      {
        page: (
          <AttemptsList
            spec={assignment.spec}
            shouldRefetch={assignment.status.spec != 1}
          />
        ),
        icon: <AlignRight color="var(--secondary)" />,
        title: locale.dashboard.assignment.attempts,
      },
    ],
    [assignment, locale]
  );

  return <LeftMenu links={links} />;
};

export default memo(AssignmentDashboard);
