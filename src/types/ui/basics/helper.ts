import { ReactNode } from 'react';
import {
  HoverCardDropdownProps,
  HoverCardProps,
  HoverCardTargetProps,
} from '@mantine/core';
import { IconSizes } from './icon';

export type MyHelperProps = {
  hoverCardProps?: HoverCardProps;
  hoverCardDropdownProps?: Omit<HoverCardDropdownProps, 'children'>;
  hoverCardTargetProps?: HoverCardTargetProps;
  dropdownContent?: string | ReactNode;
  customIcon?: ReactNode;
  iconColor?: string;
  size?: IconSizes;
};
