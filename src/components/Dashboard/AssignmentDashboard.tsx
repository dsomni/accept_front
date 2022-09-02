import { FC, ReactNode, memo, useMemo, useState } from 'react';
import Chat from '@components/Dashboard/Chat/Chat';
import Results from '@components/Dashboard/Results/Results';
import AttemptsList from '@components/Dashboard/AttemptsList/AttemptsList';
import styles from './dashboard.module.css';
import TimeInfo from '@components/Dashboard/TimeInfo/TimeInfo';
import { Group, Navbar, UnstyledButton } from '@mantine/core';
import { AlignRight, Database, Table } from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import { IAssignment } from '@custom-types/data/IAssignment';

interface IMenuLink {
  page: ReactNode;
  icon: ReactNode;
  title: string;
}

const AssignmentDashboard: FC<{
  assignment: IAssignment;
}> = ({ assignment }) => {
  const [current, setCurrent] = useState(0);
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

  return (
    <div className={styles.wrapper}>
      <Navbar p="xs" width={{ base: 300 }} withBorder={false}>
        <Navbar.Section grow mt="md">
          {links.map((element, idx) => (
            <UnstyledButton
              key={idx}
              className={`${styles.button} ${
                current === idx ? styles.activeButton : ''
              }`}
              onClick={() => setCurrent(idx)}
            >
              <Group spacing="xs" className={styles.groupWrapper}>
                <div
                  className={`${styles.line} ${
                    current === idx ? styles.activeLine : ''
                  }`}
                ></div>
                <Group className={styles.groupWrapper}>
                  {element.icon}
                  <div>{element.title}</div>
                </Group>
              </Group>
            </UnstyledButton>
          ))}
        </Navbar.Section>
      </Navbar>
      <div className={styles.pageWrapper}>{links[current].page}</div>
    </div>
  );
};

export default memo(AssignmentDashboard);
