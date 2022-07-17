import { FC, memo } from 'react';
import { Button as MantineButton, ButtonProps } from '@mantine/core';
import styles from './button.module.css';

const Button: FC<ButtonProps<'button'>> = (props) => {
  return (
    <MantineButton
      classNames={{
        label:
          props.variant == 'outline'
            ? styles.labelOutline
            : props.variant == 'light'
            ? styles.labelLight
            : styles.label,
        root:
          props.variant == 'outline'
            ? styles.rootOutline
            : props.variant == 'light'
            ? styles.rootLight
            : styles.root,
      }}
      {...props}
    />
  );
};

export default memo(Button);
