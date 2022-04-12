import { ActionIcon, Affix } from '@mantine/core';
import { FC, memo, ReactNode } from 'react';
import { pureCallback } from '@custom-types/atomic';

type positions = {
  bottom: number;
  right: number;
};

const SingularSticky: FC<{
  icon: ReactNode;
  color: string;
  onClick: pureCallback;
  position?: positions;
  classNames?: any;
}> = ({ icon, color, onClick, position, classNames }) => {
  return (
    <Affix
      position={{
        bottom: position?.bottom || 20,
        right: position?.right || 20,
      }}
    >
      <ActionIcon
        variant="filled"
        radius={60}
        size={60}
        className={classNames?.button}
        onClick={onClick}
        color={color}
      >
        {icon}
      </ActionIcon>
    </Affix>
  );
};

export default memo(SingularSticky);
