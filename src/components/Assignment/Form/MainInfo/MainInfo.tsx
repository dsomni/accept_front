import { FC, memo, useCallback } from 'react';
import styles from './mainInfo.module.css';
import {
  InputWrapper,
  Overlay,
  RangeCalendar,
  Switch,
  TimeInput,
} from '@ui/basics';
import { useLocale } from '@hooks/useLocale';
import { UseFormReturnType } from '@mantine/form';

const MainInfo: FC<{ form: UseFormReturnType<any> }> = ({ form }) => {
  const { locale } = useLocale();
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
            start={form.values.startDate}
            setStart={setStart}
            end={form.values.endDate}
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
          label={locale.assignment.form.infinite}
          {...form.getInputProps('infinite', { type: 'checkbox' })}
          onChange={(event) => {
            form.setFieldValue(
              'infinite',
              event.currentTarget.checked
            );
            form.clearErrors();
          }}
        />
      </div>
    </>
  );
};

export default memo(MainInfo);
