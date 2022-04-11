import { ActionIcon, Affix, Button, Transition } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { FC, memo, ReactNode, useState } from 'react';
import { IStickyAction } from '../Sticky';
import styles from './sticky.module.css';

const ActionButton: FC<{
  action: IStickyAction;
}> = ({ action }) => {
  return (
    <ActionIcon radius={40} size={40} variant="filled" {...action}>
      {action.icon}
    </ActionIcon>
  );
};

export default memo(ActionButton);
