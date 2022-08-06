import { FC, memo, useMemo, useCallback } from 'react';
import styles from './mainInfo.module.css';
import {
  RangeCalendar,
  TimeInput,
  Switch,
  Overlay,
  InputWrapper,
} from '@ui/basics';
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
      <InputWrapper {...form.getInputProps('dates')}>
        <div
          className={styles.dateTimeInput}
          style={{ position: 'relative' }}
        >
          {form.values.infinite && <Overlay />}
          <RangeCalendar
            start={initialStart}
            setStart={setStart}
            end={initialEnd}
            setEnd={setEnd}
            allowSingleDateInRange
            inputWrapperProps={{
              ...form.getInputProps('startDate'),
              onBlur: () => {
                form.validateField('startDate');
                form.validateField('dates');
              },
              label: locale.assignment.form.calendar,
            }}
          />
          <div className={styles.timeInputs}>
            <TimeInput
              label={locale.assignment.form.startTime}
              {...form.getInputProps('startTime')}
              onBlur={() => {
                form.validateField('startTime');
                form.validateField('dates');
              }}
            />
            <TimeInput
              label={locale.assignment.form.endTime}
              {...form.getInputProps('endTime')}
              onBlur={() => {
                form.validateField('endTime');
                form.validateField('dates');
              }}
            />
          </div>
        </div>
      </InputWrapper>

      <div>
        <Switch
          label={locale.assignment.form.isInfinite}
          {...form.getInputProps('infinite', { type: 'checkbox' })}
          onChange={(value) => {
            form.setFieldValue(
              'infinite',
              value.currentTarget.checked
            );
            form.validateField('infinite');
            form.validateField('dates');
          }}
        />
      </div>
    </>
  );
};

export default memo(MainInfo);
