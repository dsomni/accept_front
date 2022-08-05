import { FC, memo, useMemo, useCallback } from 'react';
import styles from './mainInfo.module.css';
import { RangeCalendar, TimeInput, Switch } from '@ui/basics';
import { Overlay } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';

const MainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  const initialStart = useMemo(() => form.values.startDate, []); //eslint-disable-line
  const initialEnd = useMemo(() => form.values.endDate, []); //eslint-disable-line
  const setStart = useCallback(
    (start: Date | null) => form.setFieldValue('startDate', start),
    [form]
  );
  const setEnd = useCallback(
    (end: Date | null) => form.setFieldValue('endDate', end),
    [form]
  );

  return (
    <>
      <div style={{ width: 'fit-content' }}>
        <Switch
          label={locale.assignment.form.isInfinite}
          {...form.getInputProps('isInfinite', { type: 'checkbox' })}
        />
      </div>
      <div
        className={styles.dateTimeInput}
        style={{ position: 'relative' }}
      >
        {form.values.isInfinite && <Overlay opacity={0.2} />}
        <RangeCalendar
          start={initialStart}
          setStart={setStart}
          end={initialEnd}
          setEnd={setEnd}
        />
        <div className={styles.timeInputs}>
          <TimeInput
            label={locale.assignment.form.startTime}
            {...form.getInputProps('startTime')}
          />
          <TimeInput
            label={locale.assignment.form.endTime}
            {...form.getInputProps('endTime')}
          />
        </div>
      </div>
    </>
  );
};

export default memo(MainInfo);
