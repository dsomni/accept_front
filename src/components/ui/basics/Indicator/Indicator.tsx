import { FC, memo } from 'react';
import {
  IndicatorProps,
  Indicator as MantineIndicator,
} from '@mantine/core';

const size_px = 28;

const Indicator: FC<IndicatorProps> = ({ children, ...props }) => {
  return (
    <MantineIndicator
      size={size_px}
      styles={{
        indicator: {
          backgroundColor: props.color || 'var(--accent)',
          fontSize: `${size_px / 2}px`,
        },
      }}
      {...props}
    >
      {children}
    </MantineIndicator>
  );
};

export default memo(Indicator);
