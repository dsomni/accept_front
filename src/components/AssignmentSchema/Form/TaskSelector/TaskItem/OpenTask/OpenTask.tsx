import { ActionIcon } from '@mantine/core';
import { Eye } from 'tabler-icons-react';
import { FC, memo } from 'react';

const OpenTask: FC<{ spec: string }> = ({ spec }) => {
  return (
    <ActionIcon<'a'>
      component="a"
      href={`/task/${spec}`}
      target="_blank"
      tabIndex={5}
      color="var(--primary)"
      variant="hover"
      size="lg"
    >
      <Eye width={20} height={20} />
    </ActionIcon>
  );
};

export default memo(OpenTask);
