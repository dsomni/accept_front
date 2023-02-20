import { FC, memo } from 'react';
import { Drawer as DrawerMantine, DrawerProps } from '@mantine/core';
import styles from './drawer.module.scss';

const Drawer: FC<DrawerProps> = ({ ...props }) => {
  return (
    <DrawerMantine
      className={styles.content}
      position="top"
      withCloseButton={false}
      padding="xl"
      size="lg"
      {...props}
    />
  );
};

export default memo(Drawer);
