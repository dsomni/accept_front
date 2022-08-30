import { IAssignmentResults } from '@custom-types/data/IAssignment';
import { FC, ReactNode, memo, useMemo, useState } from 'react';
import Chat from '@components/Dashboard/Chat/Chat';
import Results from '@components/Dashboard/Results/Results';
import AttemptsList from '@components/Dashboard/AttemptsList/AttemptsList';
import styles from './dashboard.module.css';
import TimeInfo from '@components/Dashboard/TimeInfo/TimeInfo';
import { Group, Navbar, UnstyledButton } from '@mantine/core';
import { AlignRight, Database, Table } from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';

interface IMenuLink {
  page: ReactNode;
  icon: ReactNode;
  title: string;
}

const AssignmentDashboard: FC<{
  spec: string;
  results: IAssignmentResults;
}> = ({ spec, results }) => {
  const [current, setCurrent] = useState(1);
  const { locale } = useLocale();
  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: (
          <div className={styles.mainInfo}>
            <TimeInfo />
            <Chat />
          </div>
        ),
        icon: <Database color="var(--secondary)" />,
        title: locale.dashboard.assignment.mainInfo,
      },
      {
        page: <Results results={results} spec={spec} />,
        icon: <Table color="var(--secondary)" />,

        title: locale.dashboard.assignment.results,
      },
      {
        page: (
          <AttemptsList
            spec={spec}
            shouldRefetch={results.assignment.status.spec != 1}
          />
        ),
        icon: <AlignRight color="var(--secondary)" />,
        title: locale.dashboard.assignment.attempts,
      },
    ],
    [results, spec, locale]
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
