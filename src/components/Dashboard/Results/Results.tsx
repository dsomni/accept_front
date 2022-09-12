import { FC, memo } from 'react';
import ResultsTable from '@ui/ResultsTable/ResultsTable';
import styles from './results.module.css';
import { useRequest } from '@hooks/useRequest';
import { IAssignmentResults } from '@custom-types/data/IAssignment';
import { LoadingOverlay } from '@mantine/core';

const Results: FC<{
  spec: string;
}> = ({ spec }) => {
  const { data, loading, refetch } = useRequest<
    {},
    IAssignmentResults
  >(`assignment/results/${spec}`, 'GET');

  return (
    <div className={styles.wrapper}>
      <LoadingOverlay visible={loading} />
      {data && (
        <ResultsTable
          refetch={refetch}
          columns={data.tasks.map((task) => ({
            text: task.title,
            href: `/task/${task.spec}?assignment=${spec}`,
          }))}
          rows={data.users.map((user) => ({
            text: user.shortName,
            href: `/profile/${user.login}`,
          }))}
          data={data.results.map((row) =>
            row.map((cell) => ({
              best: cell.best?.verdict
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
      )}
    </div>
  );
};

export default memo(Results);
