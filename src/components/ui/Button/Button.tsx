import { FC, memo } from 'react';
import { Button as MantineButton, ButtonProps } from '@mantine/core';

const Button: FC<ButtonProps<'button'>> = (props) => {
  return (
    <MantineButton
      styles={{
        label: { fontSize: 'var(--font-size-m)' },
      }}
      {...props}
    />
  );
};

export default memo(Button);
