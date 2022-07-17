import { FC, memo } from 'react';
import { Switch as MantineSwitch, SwitchProps } from '@mantine/core';
import styles from './switch.module.css';

const Switch: FC<SwitchProps> = (props) => {
  return (
    <MantineSwitch
      classNames={{
        label: styles.label,
        input: styles.input,
      }}
      size="lg"
      {...props}
    />
  );
};

export default memo(Switch);
