import 'dayjs/locale/ru';
import { FC, memo, useState, useCallback } from 'react';
import {
  RangeCalendar as MantineRangeCalendar,
  RangeCalendarProps,
} from '@mantine/dates';
import { setter } from '@custom-types/ui/atomic';
import styles from './calendar.module.css';
import { Helper, InputWrapper } from '@ui/basics';
import { MyInputWrapperProps } from '@custom-types/ui/basics/inputWrapper';
import { useLocale } from '@hooks/useLocale';

interface Props
  extends Omit<RangeCalendarProps, 'value' | 'onChange'> {
  start: Date | null;
  end: Date | null;
  setStart: setter<Date | null>;
  setEnd: setter<Date | null>;
  inputWrapperProps: MyInputWrapperProps;
}

const RangeCalendar: FC<Props> = ({
  start,
  end,
  setStart,
  setEnd,
  inputWrapperProps,
  ...props
}) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([
    start,
    end,
  ]);

  const { lang } = useLocale();

  const onChange = useCallback(
    (values: [Date | null, Date | null]) => {
      setValue(values);
      setStart(values[0]);
      setEnd(values[1]);
    },
    [setStart, setEnd]
  );

  return (
    <InputWrapper {...inputWrapperProps}>
      <MantineRangeCalendar
        locale={lang}
        {...props}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default memo(RangeCalendar);
