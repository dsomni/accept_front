import { FC, memo } from 'react';
import styles from './icon.module.css';
import { ActionIcon, ActionIconProps } from '@mantine/core';
import { useWidth } from '@hooks/useWidth';
import { IWidth } from '@custom-types/ui/atomic';

const ICON_SIZES = {
  xs: {
    '320': 14,
    '480': 18,
    '768': 18,
    '1024': 18,
    '1280': 24,
    '1440': 24,
    '1920': 26,
  },
  sm: {
    '320': 24,
    '480': 28,
    '768': 28,
    '1024': 28,
    '1280': 34,
    '1440': 34,
    '1920': 36,
  },
  md: {
    '320': 34,
    '480': 38,
    '768': 38,
    '1024': 38,
    '1280': 44,
    '1440': 44,
    '1920': 46,
  },
  lg: {
    '320': 44,
    '480': 48,
    '768': 48,
    '1024': 48,
    '1280': 54,
    '1440': 54,
    '1920': 56,
  },
  xl: {
    '320': 54,
    '480': 58,
    '768': 58,
    '1024': 58,
    '1280': 64,
    '1440': 64,
    '1920': 66,
  },
};

type IconSizes = keyof typeof ICON_SIZES;

interface Props extends Omit<ActionIconProps<'button'>, 'size'> {
  size?: IconSizes;
}

const Icon: FC<Props> = ({ children, size, ...props }) => {
  const { width } = useWidth();

  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default memo(Icon);
