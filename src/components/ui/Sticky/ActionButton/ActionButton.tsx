import { STICKY_SIZES } from '@constants/Sizes';
import { useWidth } from '@hooks/useWidth';
import { ActionIcon } from '@mantine/core';
import { FC, memo } from 'react';
import { IStickyAction } from '../Sticky';

const ActionButton: FC<{
  action: IStickyAction;
}> = ({ action }) => {
  const { width } = useWidth();
  return (
    <ActionIcon
      radius={40}
      size={(STICKY_SIZES[width] * 2) / 3}
      variant="filled"
      {...action}
    >
      {action.icon}
    </ActionIcon>
  );
};

export default memo(ActionButton);
