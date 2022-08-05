import { FC, memo } from 'react';
import {
  TimeInput as MantineTimeInput,
  TimeInputProps,
} from '@mantine/dates';

const TimeInput: FC<TimeInputProps> = (props) => {
  return <MantineTimeInput {...props} />;
};

export default memo(TimeInput);
