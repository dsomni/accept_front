import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { Calendar, TimeInput } from '@mantine/dates';
import { FC, memo, useEffect, useState } from 'react';
import { Clock2 } from 'tabler-icons-react';

const DateTimePicker: FC<{
  value: number;
  setValue: setter<number>;
  label: string;
  classNames?: any;
}> = ({ value, setValue, label, classNames }) => {
  const [startTime, setStartTime] = useState<Date | null>(
    new Date(value)
  );
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(value)
  );

  const { locale, lang } = useLocale();

  useEffect(() => {
    if (startDate && startTime) {
      const newTime =
        startDate.getTime() +
        ((startTime.getTime() % (24 * 60 * 60 * 1000)) +
          3 * 60 * 60 * 1000);
      setValue(newTime);
    }
  }, [startTime, startDate]); //eslint-disable-line

  return (
    <div className={classNames?.wrapper}>
      <div className={classNames?.label}>{label}</div>
      <Calendar
        value={startDate}
        onChange={setStartDate}
        locale={lang}
      />
      <TimeInput
        icon={<Clock2 height={20} width={20} />}
        value={startTime}
        onChange={setStartTime}
        withSeconds
      />
    </div>
  );
};

export default memo(DateTimePicker);
