import { CSSProperties, ReactNode } from 'react';
import {
  HoverCardProps,
  HoverCardDropdownProps,
  HoverCardTargetProps,
  ButtonProps,
} from '@mantine/core';

export type MyButtonProps = ButtonProps &
  React.ComponentPropsWithoutRef<'button'> &
  React.ComponentPropsWithoutRef<'a'> & {
    hoverCardProps?: HoverCardProps;
    hoverCardDropdownProps?: Omit<HoverCardDropdownProps, 'children'>;
    hoverCardTargetProps?: HoverCardTargetProps;
    dropdownContent?: string | ReactNode;
    targetWrapperStyle?: CSSProperties;
    kind?: 'positive' | 'negative';
  };
