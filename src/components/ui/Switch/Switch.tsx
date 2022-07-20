import { FC, memo, ReactNode } from 'react';
import { Switch as MantineSwitch, SwitchProps } from '@mantine/core';
import styles from './switch.module.css';
import { Helper } from '@ui/Helper/Helper';

interface Props extends SwitchProps {
  helperContent?: string | ReactNode;
}

const Switch: FC<Props> = (props) => {
  return (
    <div className={styles.wrapper}>
      <MantineSwitch
        classNames={{
          input: styles.input,
        }}
        size="lg"
        {...props}
        label={undefined}
      />
      <div className={styles.labelWrapper}>
        <div className={styles.label}>{props.label}</div>
        {props.helperContent && (
          <Helper content={props.helperContent} />
        )}
      </div>
    </div>
  );
};

export default memo(Switch);
