import { FC, memo, useState, useCallback } from 'react';
import { RangeCalendar as MantineRangeCalendar } from '@mantine/dates';
import { setter } from '@custom-types/ui/atomic';

const RangeCalendar: FC<{
  start: Date | null;
  end: Date | null;
  setStart: setter<Date | null>;
  setEnd: setter<Date | null>;
}> = ({ start, end, setStart, setEnd }) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([
    start,
    end,
  ]);

  const onChange = useCallback(
    (values: [Date | null, Date | null]) => {
      setValue(values);
      setStart(values[0]);
      setEnd(values[1]);
    },
    [setStart, setEnd]
  );

  return <MantineRangeCalendar value={value} onChange={onChange} />;
};

export default memo(RangeCalendar);
