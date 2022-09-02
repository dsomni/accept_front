import { IAssignment } from '@custom-types/data/IAssignment';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './timeInfo.module.css';
import { useLocale } from '@hooks/useLocale';
import { getLocalDate, timerDate } from '@utils/datetime';
import { useInterval } from '@mantine/hooks';

const TimeInfo: FC<{ assignment: IAssignment }> = ({
  assignment,
}) => {
  const { locale } = useLocale();
  const [timer, setTimer] = useState('');

  const [isBrowser, setIsBrowser] = useState(false);

  const tick = useCallback(() => {
    setTimer(() => {
      let date = 0;
      switch (assignment.status.spec) {
        case 0:
          date =
            new Date(assignment.start).getTime() -
            new Date().getTime();
          break;
        case 1:
          date =
            new Date(assignment.end).getTime() - new Date().getTime();
          break;
        default:
          date = 0;
      }
      return timerDate(date, locale);
    });
  }, [
    assignment.end,
    assignment.start,
    assignment.status.spec,
    locale,
  ]);

  const interval = useInterval(tick, 1000);

  useEffect(() => {
    setIsBrowser(true);
    interval.start();
    return interval.stop;
  }, [interval]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoWrapper}>
        <div className={styles.main}>
          <div className={styles.title}>
            <Link
              href={`/edu/assignment/${assignment.spec}`}
              passHref
            >
              <a>{assignment.title}</a>
            </Link>
            <div className={styles.status}>
              {locale.assignment.form.status.text}:{' '}
              {
                locale.assignment.form.status[
                  assignment.status.name as
                    | 'finished'
                    | 'pending'
                    | 'running'
                ]
              }
            </div>
          </div>
          <div className={styles.starter}>
            {locale.assignment.form.starter}
            {': '}
            {assignment.starter}
          </div>
        </div>
        <div className={styles.time}>
          <div className={styles.start}>
            {locale.assignment.form.startTime}
            {': '}
            {isBrowser && getLocalDate(assignment.start)}
          </div>
          <div className={styles.end}>
            {assignment.infinite ? (
              locale.assignment.form.infinite
            ) : (
              <>
                {locale.assignment.form.endTime}
                {': '}
                {isBrowser && getLocalDate(assignment.end)}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.settingsWrapper}></div>
      <div className={styles.timerWrapper}>
        {!assignment.infinite && (
          <div className={styles.timer}>
            {assignment.status.spec != 2 ? timer : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TimeInfo);
