import { FC, memo } from 'react';
import { Select as MantineSelect, SelectProps } from '@mantine/core';

const Select: FC<SelectProps> = (props) => {
  return (
    <MantineSelect
      styles={{ label: { fontSize: 'var(--font-size-m)' } }}
      {...props}
    />
  );
};

export default memo(Select);
