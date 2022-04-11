import { ActionIcon, Affix, Button, Transition } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { FC, memo, ReactNode, useState } from 'react';
import ActionButton from './ActionButton/ActionButton';
import styles from './sticky.module.css';
import { DotsVerticalIcon, Cross1Icon } from '@modulz/radix-icons';

export interface IStickyAction {
  icon: ReactNode;
  color: string;
  onClick: (params: any) => void;
}

const Sticky: FC<{
  actions: IStickyAction[];
  classNames?: any;
  color: string;
}> = ({ actions, classNames, color }) => {
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside(() => setVisible(false));

  return (
    <Affix ref={ref} position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={visible}>
        {(transitionStyles) => (
          <div className={styles.wrapper} style={transitionStyles}>
            {actions.map((action, index) => (
              <ActionButton key={index} action={action} />
            ))}
          </div>
        )}
      </Transition>
      <ActionIcon
        variant="filled"
        radius={60}
        size={60}
        className={classNames?.button}
        onClick={() => setVisible((visible) => !visible)}
        color={color}
      >
        {!visible && <DotsVerticalIcon width={20} height={20} />}
        {visible && <Cross1Icon width={20} height={20} />}
      </ActionIcon>
    </Affix>
  );
};

export default memo(Sticky);
