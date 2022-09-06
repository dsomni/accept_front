import { FC, memo } from 'react';
import styles from './icon.module.css';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useWidth } from '@hooks/useWidth';
import { IWidth } from '@custom-types/ui/atomic';
import { MyIconProps } from '@custom-types/ui/basics/icon';
import { ICON_SIZES } from '@constants/Sizes';

const Icon: FC<MyIconProps> = ({
  children,
  size,
  tooltipLabel,
  tooltipProps,
  wrapperClassName,
  ...props
}) => {
  const { width } = useWidth();

  return (
    <div className={`${styles.wrapper} ${wrapperClassName || ''}`}>
      <Tooltip
        label={tooltipLabel}
        openDelay={500}
        withArrow
        disabled={!!!tooltipLabel}
        {...tooltipProps}
      >
        <ActionIcon
          {...props}
          size={
            size
              ? ICON_SIZES[size][width as IWidth]
              : ICON_SIZES['md'][width as IWidth]
          }
        >
          {children}
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

export default memo(Icon);
