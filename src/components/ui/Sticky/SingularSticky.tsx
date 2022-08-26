import { ActionIcon, Affix } from '@mantine/core';
import { FC, ReactNode, memo } from 'react';
import { pureCallback } from '@custom-types/ui/atomic';
import { useWidth } from '@hooks/useWidth';
import { STICKY_SIZES } from '@constants/Sizes';

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
  const { width } = useWidth();
  return (
    <Affix
      position={{
        bottom: position?.bottom || 20,
        right: position?.right || 20,
      }}
      zIndex={199}
    >
      <ActionIcon
        variant="filled"
        radius={60}
        size={STICKY_SIZES[width]}
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
