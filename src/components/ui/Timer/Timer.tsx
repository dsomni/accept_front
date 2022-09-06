import { FC, memo, useCallback, useEffect, useState } from 'react';
import styles from './timer.module.css';
import { Icon } from '@ui/basics';
import { Alarm } from 'tabler-icons-react';
import { useLocale } from '@hooks/useLocale';
import { timerDate } from '@utils/datetime';
import { useInterval } from '@mantine/hooks';
import { useRequest } from '@hooks/useRequest';
import { IAssignmentTimeInfo } from '@custom-types/data/IAssignment';

const RED_TIME_S = 3600;

const Timer: FC<{ spec: string }> = ({ spec }) => {
  const [showTimer, setShowTimer] = useState(false);
  const { locale } = useLocale();

  const { data, loading, refetch } = useRequest<
    {},
    IAssignmentTimeInfo
  >(`assignment/info/${spec}`, 'GET');
  const refetchTimer = useInterval(() => refetch(false), 3000);

  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  const tick = useCallback(() => {
    let date = 0;
    if (!loading && (data?.infinite || data?.status.spec == 2))
      refetchTimer.stop();
    if (data && !data.infinite) {
      switch (data.status.spec) {
        case 0:
          date =
            new Date(data.start).getTime() - new Date().getTime();
          break;
        case 1:
          date = new Date(data.end).getTime() - new Date().getTime();
          break;
        default:
          date = 0;
      }
    }
    const time = timerDate(date, locale);
    setSeconds(time.seconds);
    setMinutes(time.minutes);
    setHours(time.hours);
    setDays(time.days + time.months * 30 + time.years * 365);
  }, [data, loading, locale, refetchTimer]);

  const interval = useInterval(tick, 1000);

  useEffect(() => {
    refetchTimer.start();

    return refetchTimer.stop;
  }, []); // eslint-disable-line

  useEffect(() => {
    interval.start();
    return () => {
      interval.stop();
    };
  }, [tick]); // eslint-disable-line

  return (
    <>
      {!loading && data && !data.infinite && (
        <div
          className={
            styles.wrapper + ' ' + (showTimer ? styles.show : '')
          }
        >
          <Icon
            onClick={() => {
              setShowTimer((value) => !value);
            }}
            size={'xs'}
            className={styles.iconRoot}
            wrapperClassName={styles.iconWrapper}
          >
            <Alarm
              color={
                !data &&
                +hours == 0 &&
                +days == 0 &&
                +minutes * 60 + +seconds < RED_TIME_S
                  ? 'var(--negative)'
                  : 'var(--primary)'
              }
            />
          </Icon>
          <div className={styles.timerWrapper}>
            <div
              className={
                styles.before +
                ' ' +
                (data.status.spec === 2 ? styles.finished : '')
              }
            >
              {data.status.spec != 2
                ? data.status.spec == 0
                  ? locale.timer.beforeStart
                  : locale.timer.beforeEnd
                : locale.timer.finished}
            </div>
            {data.status.spec !== 2 && (
              <div className={styles.timer}>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>{days}</div>
                  <div className={styles.numberTitle}>
                    {locale.timer.days(+days)}
                  </div>
                </div>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>{hours}</div>
                  <div className={styles.numberTitle}>
                    {locale.timer.hours(+hours)}
                  </div>
                </div>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>{minutes}</div>
                  <div className={styles.numberTitle}>
                    {locale.timer.minutes(+minutes)}
                  </div>
                </div>
                <div className={styles.numberWrapper}>
                  <div className={styles.number}>{seconds}</div>
                  <div className={styles.numberTitle}>
                    {locale.timer.seconds(+seconds)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Timer);
