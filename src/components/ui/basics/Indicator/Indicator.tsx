import { FC, memo } from 'react';
import {
  IndicatorProps,
  Indicator as MantineIndicator,
} from '@mantine/core';

const SIZES: {
  [key: string]: { size_px: number; font_size: number };
} = {
  sm: { size_px: 20, font_size: 10 },
  md: { size_px: 28, font_size: 14 },
};

interface CustomIndicatorProps extends IndicatorProps {
  scale?: keyof typeof SIZES;
}

const Indicator: FC<CustomIndicatorProps> = ({
  children,
  label,
  scale = 'md',
  ...props
}) => {
  const { size_px, font_size } = SIZES[scale];
  return (
    <MantineIndicator
      size={size_px}
      styles={{
        indicator: {
          backgroundColor: props.color || 'var(--accent)',
          fontSize: `${font_size}px`,
        },
      }}
      overflowCount={99}
      {...props}
      label={label && label.toString()}
    >
      {children}
    </MantineIndicator>
  );
};

export default memo(Indicator);
