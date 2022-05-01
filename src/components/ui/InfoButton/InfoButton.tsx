import { Button, Tooltip } from '@mantine/core';

export interface CustomProps {
  text: string;
  [x: string]: any;
}

export function InfoButton({ text, ...rest }: CustomProps) {
  return (
    <Tooltip
      label={text}
      openDelay={300}
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
      <Button {...rest} />
    </Tooltip>
  );
}
