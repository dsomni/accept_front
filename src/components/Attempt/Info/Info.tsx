import { IAttempt } from '@custom-types/data/IAttempt';
import PrimitiveTable from '@ui/PrimitiveTable/PrimitiveTable';
import { getLocalDate } from '@utils/datetime';
import Link from 'next/link';
import { FC, memo, useEffect, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import tableStyles from '@styles/ui/customTable.module.css';

import styles from './info.module.css';

const Info: FC<{ attempt: IAttempt }> = ({ attempt }) => {
  const { locale } = useLocale();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <div className={styles.infoWrapper}>
      <div className={styles.left}>
        <div>{isBrowser && getLocalDate(attempt.date)}</div>
        <div>
          {locale.attempt.task}{' '}
          <Link href={`/task/${attempt.task.spec}`} passHref>
            <a className={styles.link}>{attempt.task.title}</a>
          </Link>
        </div>
        <div>
          {locale.attempt.author}{' '}
          <Link href={`/profile/${attempt.author.login}`} passHref>
            <a className={styles.link}>{attempt.author.shortName}</a>
          </Link>
        </div>
        <div>
          {locale.attempt.language}
          {': '}
          <span>{attempt.language.name}</span>
        </div>
        <div>
          {locale.attempt.status}
          {': '}
          <span>{locale.attempt.statuses[attempt.status.spec]}</span>
        </div>
        <div>
          {locale.attempt.constraints.time}
          {': '}
          <span
            style={{
              fontSize: 'var(--font-size-m)',
            }}
          >
            {attempt.constraints?.time || 0}
            {'s'}
          </span>
        </div>
        <div>
          {locale.attempt.constraints.memory}
          {': '}
          <span>
            {attempt.constraints?.memory || 0}
            {'MB'}
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          <PrimitiveTable
            columnSizes={[1, 2]}
            columns={[locale.attempt.test, locale.attempt.result]}
            rows={attempt.results.map((row, index) => ({
              ...row,
              index: index + 1,
            }))}
            classNames={{
              column: styles.column,
              row: tableStyles.row,
              table: tableStyles.table,
              even: tableStyles.even,
            }}
            rowComponent={(row: any) => {
              return (
                <>
                  <td
                    className={`${tableStyles.cell} ${styles.cell}`}
                  >
                    {row.index}
                  </td>
                  <td
                    className={`${tableStyles.cell} ${styles.cell}`}
                    style={{
                      color: row.verdict
                        ? row.verdict.spec === 0
                          ? 'var(--positive)'
                          : 'var(--negative)'
                        : 'black',
                    }}
                  >
                    {row.verdict?.shortText || '-'}
                  </td>
                </>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Info);
