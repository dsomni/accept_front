import { FC, memo, ReactNode, useMemo, useState } from 'react';
import {
  Button as MantineButton,
  ButtonProps,
  Popover,
  PopoverProps,
} from '@mantine/core';
import styles from './button.module.css';

interface Props extends ButtonProps<'button'> {
  popoverProps?: PopoverProps;
  popoverContent?: string | ReactNode;
}

const Button: FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);

  const button = useMemo(
    () => (
      <MantineButton
        onMouseEnter={() => setOpened(true)}
        onMouseLeave={() => setOpened(false)}
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
    ),
    [props]
  );

  return (
    <Popover
      disabled={!!!props.popoverContent}
      target={button}
      withArrow
      opened={opened}
      position="bottom"
      placement="center"
      arrowSize={5}
      width={400}
      transition={'scale'}
      transitionDuration={300}
      {...props.popoverProps}
    >
      <div className={styles.popoverContentWrapper}>
        {props.popoverContent}
      </div>
    </Popover>
  );
};

export default memo(Button);
