import { Tooltip } from '@mantine/core';
import { InfoCircledIcon } from '@modulz/radix-icons';
import { FC } from 'react';

export const Helper: FC<{ text: string }> = ({ text }) => {
  return (
    <Tooltip
      label={text}
      withArrow
      wrapLines
      arrowSize={3}
      placement="start"
      styles={{
        root: { width: 'fit-content' },
        body: {
          maxWidth: '250px',
          backgroundColor: '#64a6e8',
          color: 'white',
        },
        arrow: { backgroundColor: '#64a6e8' },
      }}
    >
      <InfoCircledIcon
        width={24}
        height={24}
        color={'var(--primary)'}
      />
    </Tooltip>
  );
};
