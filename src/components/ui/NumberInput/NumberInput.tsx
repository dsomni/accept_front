import { FC, memo } from 'react';
import styles from './numberInput.module.css';
import {
  NumberInput as MantineNumberInput,
  NumberInputProps,
} from '@mantine/core';

const NumberInput: FC<NumberInputProps> = (props) => {
  return (
    <MantineNumberInput
      classNames={{
        label: styles.label,
      }}
      size="lg"
      {...props}
    />
  );
};

export default memo(NumberInput);
