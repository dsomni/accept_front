import { FC, memo } from 'react';
import {
  IndicatorProps,
  Indicator as MantineIndicator,
} from '@mantine/core';

const Indicator: FC<IndicatorProps> = ({ children, ...props }) => {
  return (
    <MantineIndicator
      size={24}
      styles={{
        indicator: {
          backgroundColor: 'var(--accent)',
          fontSize: 'var(--font-size-s)',
        },
      }}
      {...props}
    >
      {children}
    </MantineIndicator>
  );
};

export default memo(Indicator);
