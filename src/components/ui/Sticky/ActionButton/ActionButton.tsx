import { STICKY_SIZES } from '@constants/Sizes';
import { useWidth } from '@hooks/useWidth';
import { ActionIcon } from '@mantine/core';
import { FC, memo } from 'react';
import { IStickyAction } from '../Sticky';
import { Tip } from '@ui/basics';
import stickyStyles from '../sticky.module.css';

const ActionButton: FC<{
  action: IStickyAction;
}> = ({ action }) => {
  const { width } = useWidth();
  return (
    <Tip
      label={
        <div className={stickyStyles.description}>
          {action.description}
        </div>
      }
      position="left"
      openDelay={500}
    >
      <ActionIcon
        component={action.onClick ? 'button' : 'a'}
        radius={40}
        size={(STICKY_SIZES[width] * 2) / 3}
        variant="filled"
        {...action}
      >
        {action.icon}
      </ActionIcon>
    </Tip>
  );
};

export default memo(ActionButton);
