import { FC, memo, useEffect, useState } from 'react';
import ResultsTable from '@ui/ResultsTable/ResultsTable';
import styles from './results.module.css';
import { useRequest } from '@hooks/useRequest';
import { IAssignmentResults } from '@custom-types/data/IAssignment';
import { LoadingOverlay } from '@mantine/core';
import { SegmentedControl } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';

const Results: FC<{
  spec: string;
  isFinished: boolean;
  endDate: Date;
}> = ({ spec, isFinished, endDate }) => {
  const { locale } = useLocale();
  const [fetchDate, setFetchDate] = useState<'actual' | 'end'>(
    isFinished ? 'end' : 'actual'
  );

  const { data, loading, refetch } = useRequest<
    {
      toDate: Date | undefined;
    },
    IAssignmentResults
  >(`assignment/results/${spec}`, 'POST', {
    toDate: fetchDate == 'end' ? endDate : undefined,
  });

  useEffect(() => {
    refetch(true);
  }, [fetchDate]); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      {isFinished && (
        <SegmentedControl
          data={[
            {
              label: locale.dashboard.assignment.toDate.end,
              value: 'end',
            },
            {
              label: locale.dashboard.assignment.toDate.actual,
              value: 'actual',
            },
          ]}
          value={fetchDate}
          onChange={(value) =>
            setFetchDate(value as 'actual' | 'end')
          }
        />
      )}
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
