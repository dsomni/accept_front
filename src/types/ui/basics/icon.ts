import { ICON_SIZES } from '@constants/Sizes';
import { ActionIconProps, TooltipProps } from '@mantine/core';

type IconSizes = keyof typeof ICON_SIZES;

export type MyIconProps = Omit<ActionIconProps, 'size'> &
  React.ComponentPropsWithoutRef<'button'> &
  React.ComponentPropsWithoutRef<'a'> & {
    size?: IconSizes;
    tooltipLabel?: string;
    tooltipProps?: TooltipProps;
  };
