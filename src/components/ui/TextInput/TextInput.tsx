import { FC, memo } from 'react';
import styles from './textInput.module.css';
import {
  TextInput as MantineInput,
  TextInputProps,
} from '@mantine/core';

const TextInput: FC<TextInputProps> = (props) => {
  return (
    <MantineInput
      classNames={{
        label: styles.label,
      }}
      size="lg"
      {...props}
    />
  );
};

export default memo(TextInput);
