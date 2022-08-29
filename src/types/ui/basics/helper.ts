import { ReactNode } from 'react';
import {
  HoverCardProps,
  HoverCardDropdownProps,
  HoverCardTargetProps,
} from '@mantine/core';

export type MyHelperProps = {
  hoverCardProps?: HoverCardProps;
  hoverCardDropdownProps?: Omit<HoverCardDropdownProps, 'children'>;
  hoverCardTargetProps?: HoverCardTargetProps;
  dropdownContent?: string | ReactNode;
  customIcon?: ReactNode;
};
