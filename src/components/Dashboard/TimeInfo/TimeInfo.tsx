import { FC, memo, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './timeInfo.module.css';
import { useLocale } from '@hooks/useLocale';
import { getLocalDate, timerDate } from '@utils/datetime';
import { useInterval } from '@mantine/hooks';
import { Button } from '@ui/basics';

import { sendRequest } from '@requests/request';
import { ILocale } from '@custom-types/ui/ILocale';
import CustomTimeModal from '@components/Dashboard/TimeInfo/CustomTimeModal/CustomTimeModal';
import { IAssignmentStatus } from '@custom-types/data/atomic';
import { IAssignmentDisplay } from '@custom-types/data/IAssignment';

interface ITimeChangeButton {
  value: number;
  multiple: number;
  units: (_: ILocale, __: number) => string;
}

const DECREASE_TIME: ITimeChangeButton[] = [
  {
    value: 1,
    multiple: 3600,
    units: (locale: ILocale, value: number) =>
      locale.timer.hours(value),
  },
  {
    value: 10,
    multiple: 60,
    units: (locale: ILocale, value: number) =>
      locale.timer.minutes(value),
  },
];

const INCREASE_TIME: ITimeChangeButton[] = [
  {
    value: 10,
    multiple: 60,
    units: (locale: ILocale, value: number) =>
      locale.timer.minutes(value),
  },
  {
    value: 1,
    multiple: 3600,
    units: (locale: ILocale, value: number) =>
      locale.timer.hours(value),
  },
];

const TimeInfo: FC<{
  assignment: IAssignmentDisplay;
  refetch: () => void;
}> = ({ assignment, refetch }) => {
  const { locale } = useLocale();
  const [timer, setTimer] = useState('');

  const [isBrowser, setIsBrowser] = useState(false);

  const tick = useCallback(() => {
    setTimer(() => {
      let date = 0;
      switch (assignment.status.spec) {
        case 0:
          console.log(new Date(assignment.start), new Date());
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
  }, [assignment, locale]);

  const interval = useInterval(tick, 1000);

  useEffect(() => {
    setIsBrowser(true);
    interval.start();
    return interval.stop;
  }, [interval]);

  const handleTimeButton = useCallback(
    (time: number) => {
      sendRequest<
        { amount: number },
        { end: Date; status: IAssignmentStatus }
      >(`assignment/time/${assignment.spec}`, 'POST', {
        amount: time,
      }).then((res) => {
        if (!res.error) {
          refetch();
        }
      });
    },
    [assignment.spec, refetch]
  );

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
      <div className={styles.timeWrapper}>
        <div className={styles.timerWrapper}>
          {!assignment.infinite && (
            <div className={styles.timer}>
              {assignment.status.spec != 2
                ? `${
                    assignment.status.spec == 0
                      ? locale.timer.beforeStart
                      : locale.timer.beforeEnd
                  } ${timer}`
                : ''}
            </div>
          )}
        </div>
        <div className={styles.buttonsWrapper}>
          {DECREASE_TIME.map((buttonObject, idx) => (
            <Button
              key={idx}
              targetWrapperStyle={{ width: '100%' }}
              buttonWrapperStyle={{ width: '100%' }}
              style={{
                borderLeft: idx == 0 ? undefined : 'none',
                borderRadius: 0,
                fontSize: 'var(--font-size-s)',
              }}
              fullWidth
              variant="outline"
              onClick={() =>
                handleTimeButton(
                  -(buttonObject.value * buttonObject.multiple)
                )
              }
            >
              {`- ${buttonObject.value} ${buttonObject.units(
                locale,
                buttonObject.value
              )}`}
            </Button>
          ))}
          <CustomTimeModal
            handleTime={(time: number) => handleTimeButton(time)}
          />
          {INCREASE_TIME.map((buttonObject, idx) => (
            <Button
              key={idx}
              targetWrapperStyle={{ width: '100%' }}
              buttonWrapperStyle={{ width: '100%' }}
              style={{
                borderLeft: 'none',
                borderRadius: 0,
                fontSize: 'var(--font-size-s)',
              }}
              fullWidth
              variant="outline"
              onClick={() =>
                handleTimeButton(
                  buttonObject.value * buttonObject.multiple
                )
              }
            >
              {`+ ${buttonObject.value} ${buttonObject.units(
                locale,
                buttonObject.value
              )}`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(TimeInfo);
