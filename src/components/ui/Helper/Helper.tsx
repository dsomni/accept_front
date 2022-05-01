import { Tooltip } from '@mantine/core';
import { InfoCircledIcon } from '@modulz/radix-icons';
import { FC } from 'react';

export const Helper: FC<{ text: string }> = ({ text }) => {
  return (
    <Tooltip
      label={text}
      withArrow
      arrowSize={3}
      styles={{ root: { width: 'fit-content' } }}
    >
      <InfoCircledIcon width={24} height={24} color="blue" />
    </Tooltip>
  );
};
