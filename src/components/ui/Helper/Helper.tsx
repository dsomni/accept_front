import { Popover, PopoverProps } from '@mantine/core';
import { Help } from 'tabler-icons-react';
import { FC, ReactNode, useState } from 'react';
import styles from './helper.module.css';
import Icon from '@ui/Icon/Icon';

interface Props
  extends Omit<PopoverProps, 'opened' | 'children' | 'target'> {
  content: string | ReactNode;
}

export const Helper: FC<Props> = ({ content, ...props }) => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      withArrow
      position="bottom"
      placement="center"
      arrowSize={5}
      transition={'scale'}
      transitionDuration={300}
      classNames={{ popover: styles.popover }}
      {...props}
      target={
        <Icon size="xs">
          <Help
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
            color={'var(--dark4)'}
          />
        </Icon>
      }
      opened={opened}
    >
      <div className={styles.contentWrapper}>{content}</div>
    </Popover>
  );
};
