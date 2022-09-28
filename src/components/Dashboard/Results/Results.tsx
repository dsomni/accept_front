import { FC, memo, useEffect, useState } from 'react';
import ResultsTable from '@ui/ResultsTable/ResultsTable';
import styles from './results.module.css';
import { useRequest } from '@hooks/useRequest';
import { LoadingOverlay } from '@mantine/core';
import { SegmentedControl } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';
import { IFullResults } from '@custom-types/data/IResults';

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
    IFullResults
  >(`assignment/results/${spec}`, 'POST', {
    toDate: fetchDate == 'end' ? endDate : undefined,
  });

  useEffect(() => {
    if (!loading) refetch(true);
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
      {data && data.users.length > 0 && data.tasks.length > 0 ? (
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
                ? `${cell.best.verdict.shortText} #${
                    cell.best.verdictTest + 1
                  }`
                : '-',
              rest: cell.results.map((result) => ({
                text: result.verdict
                  ? `${result.verdict.shortText} #${
                      result.verdictTest + 1
                    }`
                  : '?',
                href: `/attempt/${result.attempt}`,
              })),
            }))
          )}
        />
      ) : (
        <div className={styles.empty}>
          {locale.ui.table.emptyMessage}
        </div>
      )}
    </div>
  );
};

export default memo(Results);
