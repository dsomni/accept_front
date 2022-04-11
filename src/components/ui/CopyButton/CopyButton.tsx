import { FC, memo } from 'react';
import { ActionIcon } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { CopyIcon, CheckIcon } from '@modulz/radix-icons';

const CopyButton: FC<{ toCopy: string }> = ({ toCopy }) => {
  const clipboard = useClipboard({ timeout: 300 });
  return (
    <ActionIcon
      color={clipboard.copied ? 'teal' : 'blue'}
      onClick={() => {
        clipboard.copy(toCopy);
      }}
    >
      {clipboard.copied ? (
        <CheckIcon width={20} height={20}></CheckIcon>
      ) : (
        <CopyIcon width={20} height={20} />
      )}
    </ActionIcon>
  );
};

export default memo(CopyButton);
