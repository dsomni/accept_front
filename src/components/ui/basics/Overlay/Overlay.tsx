import { FC, memo, ReactNode } from 'react';
import styles from './overlay.module.css';
import {
  Overlay as MantineOverlay,
  OverlayProps,
} from '@mantine/core';

const Overlay: FC<OverlayProps> = (props) => {
  return <MantineOverlay {...props} opacity={0.6} blur={1.5} />;
};

export default memo(Overlay);
