import { ActionIcon, AffixProps } from '@mantine/core';
import { FC, ReactNode, memo } from 'react';
import { pureCallback } from '@custom-types/ui/atomic';
import { useWidth } from '@hooks/useWidth';
import { STICKY_SIZES } from '@constants/Sizes';
import dynamic from 'next/dynamic';

const DynamicAffix = dynamic<AffixProps>(() =>
  import('@mantine/core').then((mod) => mod.Affix)
);

type positions = {
  bottom: number;
  right: number;
};

const SingularSticky: FC<{
  icon: ReactNode;
  color?: string;
  onClick?: pureCallback;
  href?: string;
  position?: positions;
  classNames?: any;
}> = ({ icon, position, color, classNames, ...props }) => {
  const { width } = useWidth();
  return (
    <>
      <DynamicAffix
        position={{
          bottom: position?.bottom || 20,
          right: position?.right || 20,
        }}
        zIndex={199}
      >
        <ActionIcon
          component={props.onClick ? 'button' : 'a'}
          variant="filled"
          radius={60}
          size={STICKY_SIZES[width]}
          className={classNames?.button}
          style={{ backgroundColor: color || 'var(--positive)' }}
          {...props}
        >
          {icon}
        </ActionIcon>
      </DynamicAffix>
    </>
  );
};

export default memo(SingularSticky);
