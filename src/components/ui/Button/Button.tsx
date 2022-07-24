import {
  FC,
  memo,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Button as MantineButton,
  ButtonProps,
  Popover,
  PopoverProps,
} from '@mantine/core';
import styles from './button.module.css';

interface Props extends ButtonProps<'button'> {
  popoverProps?: Omit<PopoverProps, 'opened' | 'children' | 'target'>;
  popoverContent?: string | ReactNode;
}

const Button: FC<Props> = (props) => {
  const [opened, setOpened] = useState(false);

  const { popoverProps, popoverContent, ...buttonProps } = props;

  const button = useMemo(
    () => (
      <MantineButton
        onMouseEnter={() => setOpened(true)}
        onMouseLeave={() => setOpened(false)}
        classNames={{
          label:
            buttonProps.variant == 'outline'
              ? styles.labelOutline
              : buttonProps.variant == 'light'
              ? styles.labelLight
              : styles.label,
          root:
            buttonProps.variant == 'outline'
              ? styles.rootOutline
              : buttonProps.variant == 'light'
              ? styles.rootLight
              : styles.root,
        }}
        {...buttonProps}
      />
    ),
    [buttonProps]
  );

  return (
    <Popover
      disabled={!!!popoverContent}
      target={button}
      withArrow
      opened={opened}
      position="bottom"
      placement="center"
      arrowSize={5}
      transition={'scale'}
      transitionDuration={300}
      {...popoverProps}
      style={{ ...popoverProps?.style, ...buttonProps.style }}
    >
      <div className={styles.popoverContentWrapper}>
        {popoverContent}
      </div>
    </Popover>
  );
};

export default memo(Button);
