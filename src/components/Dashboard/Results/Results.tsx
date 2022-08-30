import { FC, memo } from 'react';
import { IAssignmentResults } from '@custom-types/data/IAssignment';
import ResultsTable from '@ui/ResultsTable/ResultsTable';
import styles from './results.module.css';

const Results: FC<{
  spec: string;
  results: IAssignmentResults;
}> = ({ spec, results }) => {
  return (
    <div className={styles.wrapper}>
      <ResultsTable
        columns={results.tasks.map((task) => ({
          text: task.title,
          href: `/task/${task.spec}?assignment=${spec}`,
        }))}
        rows={results.users.map((user) => ({
          text: user.shortName,
          href: `/profile/${user.login}`,
        }))}
        data={results.results.map((row) =>
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
};

export default memo(Results);
