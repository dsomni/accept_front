import { ReactNode } from 'react';
import {
  HoverCardDropdownProps,
  HoverCardProps,
  HoverCardTargetProps,
} from '@mantine/core';

export type MyHelperProps = {
  hoverCardProps?: HoverCardProps;
  hoverCardDropdownProps?: Omit<HoverCardDropdownProps, 'children'>;
  hoverCardTargetProps?: HoverCardTargetProps;
  dropdownContent?: string | ReactNode;
  customIcon?: ReactNode;
  iconColor?: string;
};
