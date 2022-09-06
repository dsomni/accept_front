import { FC, memo } from 'react';
import styles from './attemptsList.module.css';
import tableStyles from '@styles/ui/customTable.module.css';
import { IAttemptDisplay } from '@custom-types/data/IAttempt';
import { default as AttemptListUI } from '@ui/AttemptList/AttemptList';
import { ILocale } from '@custom-types/ui/ILocale';
import { ITableColumn } from '@custom-types/ui/ITable';
import { getLocalDate } from '@utils/datetime';
import Link from 'next/link';
import { useLocale } from '@hooks/useLocale';

const refactorAttempt = (
  attempt: IAttemptDisplay,
  locale: ILocale
): any => ({
  ...attempt,
  result: {
    display: (
      <div
        style={{
          color:
            attempt.status.spec == 2
              ? attempt.verdict.verdict.spec == 0
                ? 'var(--positive)'
                : 'var(--negative)'
              : 'black',
        }}
      >
        {attempt.status.spec == 2
          ? attempt.verdict.verdict.shortText +
            ' #' +
            (attempt.verdict.test + 1).toString()
          : locale.attempt.statuses[attempt.status.spec]}
      </div>
    ),
    value:
      attempt.status.spec == 2
        ? attempt.verdict.verdict.spec
        : attempt.status.spec - 10,
  },
  date: {
    display: <>{getLocalDate(attempt.date)}</>,
    value: new Date(attempt.date).getTime(),
  },
  language: {
    display: <>{attempt.language.name}</>,
    value: attempt.language,
  },
  task: {
    display: (
      <Link href={`/task/${attempt.task.spec}`} passHref>
        <a className={styles.taskLink}>{attempt.task.title}</a>
      </Link>
    ),
    value: attempt.task,
  },
  author: {
    display: (
      <div className={tableStyles.titleWrapper}>
        <a
          className={tableStyles.title}
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
    size: 4,
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
    size: 5,
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
    size: 3,
  },
];

const AttemptList: FC<{
  spec: string;
  shouldNotRefetch: boolean;
}> = ({ spec, shouldNotRefetch }) => {
  const { locale } = useLocale();
  return (
    <div className={styles.wrapper}>
      <AttemptListUI
        url={`assignment/attempts/${spec}`}
        activeTab
        initialColumns={initialColumns}
        refactorAttempt={refactorAttempt}
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
