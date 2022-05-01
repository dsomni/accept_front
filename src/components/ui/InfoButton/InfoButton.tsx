import { Button, Tooltip } from '@mantine/core';
import { FC } from 'react';

export const InfoButton: FC<{ text: string; color?: string }> = ({
  text,
  color,
  ...rest
}) => {
  return (
    <Tooltip label={text} openDelay={300} color={color}>
      <Button color={color} {...rest} />
    </Tooltip>
  );
};
