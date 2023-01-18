import { FC, memo, useCallback, useState } from 'react';
import styles from './attemptsList.module.css';
import tableStyles from '@styles/ui/customTable.module.css';
import { IAttemptDisplay } from '@custom-types/data/IAttempt';
import { default as AttemptListUI } from '@ui/AttemptList/AttemptList';
import { ILocale } from '@custom-types/ui/ILocale';
import { ITableColumn } from '@custom-types/ui/ITable';
import { getLocalDate } from '@utils/datetime';
import Link from 'next/link';
import { useLocale } from '@hooks/useLocale';
import { SegmentedControl } from '@ui/basics';

const refactorAttempt = (
  attempt: IAttemptDisplay,
  locale: ILocale,
  type: string
): any => ({
  ...attempt,
  result: {
    display: (
      <div
        style={{
          color:
            attempt.status.spec == 2
              ? attempt.verdict?.verdict.spec == 0
                ? 'var(--positive)'
                : 'var(--negative)'
              : attempt.status.spec == 3
              ? 'var(--accent)'
              : 'black',
        }}
      >
        {attempt.status.spec == 2
          ? (attempt.verdict?.verdict.shortText || 'ER') +
            ' #' +
            ((attempt.verdict?.test || 0) + 1).toString()
          : locale.attempt.statuses[attempt.status.spec]}
      </div>
    ),
    value:
      attempt.status.spec == 2
        ? attempt.verdict?.verdict.spec
        : attempt.status.spec == 3
        ? attempt.status.spec - 20
        : attempt.status.spec - 10,
  },
  date: {
    display: (
      <a
        className={tableStyles.link}
        href={`/attempt/${attempt.spec}`}
      >
        {getLocalDate(attempt.date)}
      </a>
    ),
    value: new Date(attempt.date).getTime(),
  },
  language: {
    display: <>{attempt.language.name}</>,
    value: attempt.language,
  },
  task: {
    display: (
      <Link
        href={`/task/${attempt.task.spec}?${type}=${attempt.task.spec}`}
        passHref
        className={styles.taskLink}
      >
        {attempt.task.title}
      </Link>
    ),
    value: attempt.task,
  },
  author: {
    display: (
      <div className={tableStyles.titleWrapper}>
        <a
          className={tableStyles.link}
          href={`/profile/${attempt.author}`}
        >
          {attempt.author}
        </a>
      </div>
    ),
    value: attempt.author,
  },
});

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: locale.attempt.date,
    key: 'date',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.date.value > b.date.value
        ? -1
        : a.date.value == b.date.value
        ? 0
        : 1,
    sorted: -1,
    allowMiddleState: false,
    hidable: false,
    hidden: false,
    size: 3,
  },
  {
    label: locale.attempt.author,
    key: 'author',
    sortable: false,
    sortFunction: (_: any, __: any) => 0,
    sorted: 0,
    allowMiddleState: false,
    hidable: false,
    hidden: false,
    size: 3,
  },
  {
    label: locale.attempt.task,
    key: 'task',
    sortable: false,
    sortFunction: (_: any, __: any) => 0,
    sorted: 0,
    allowMiddleState: false,
    hidable: false,
    hidden: false,
    size: 6,
  },
  {
    label: locale.attempt.language,
    key: 'language',
    sortable: false,
    sortFunction: (_: any, __: any) => 0,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 3,
  },
  {
    label: locale.attempt.result,
    key: 'result',
    sortable: false,
    sortFunction: (_: any, __: any) => 0,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 2,
  },
];

const AttemptList: FC<{
  spec: string;
  shouldNotRefetch: boolean;
  isFinished: boolean;
  endDate: Date;
  type: 'assignment' | 'tournament';
  banned?: boolean;
}> = ({
  spec,
  shouldNotRefetch,
  isFinished,
  endDate,
  type,
  banned,
}) => {
  const { locale } = useLocale();
  const [fetchDate, setFetchDate] = useState<'actual' | 'end'>(
    isFinished ? 'end' : 'actual'
  );
  const refactor = useCallback(
    (attempt: IAttemptDisplay, locale: ILocale) =>
      refactorAttempt(attempt, locale, type),
    [type]
  );

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
      <AttemptListUI
        url={`${type}/attempts${banned ? '-banned' : ''}/${spec}`}
        activeTab
        initialColumns={initialColumns}
        refactorAttempt={refactor}
        toDate={fetchDate == 'end' ? endDate : undefined}
        empty={<>{locale.profile.empty.attempts}</>}
        noDefault
        shouldNotRefetch={shouldNotRefetch}
        classNames={{
          wrapper: tableStyles.wrapper,
          table: tableStyles.table,
          headerCell: styles.headerCell,
          cell: styles.cell,
          even: tableStyles.even,
          odd: tableStyles.odd,
        }}
      />
    </div>
  );
};

export default memo(AttemptList);
