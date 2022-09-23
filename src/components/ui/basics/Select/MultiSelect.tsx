import { FC, memo } from 'react';
import {
  MultiSelect as MantineSelect,
  MultiSelectProps,
} from '@mantine/core';
import styles from './select.module.css';

const MultiSelect: FC<MultiSelectProps> = (props) => {
  return (
    <MantineSelect
      classNames={{
        value: styles.selectedMulti,
        input: styles.inputElemMulti,
      }}
      {...props}
      clearable={false}
    />
  );
};

export default memo(MultiSelect);
