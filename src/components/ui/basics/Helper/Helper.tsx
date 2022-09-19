import { Help } from 'tabler-icons-react';
import { FC, memo } from 'react';
import styles from './helper.module.css';
import { Icon } from '@ui/basics';
import { MyHelperProps } from '@custom-types/ui/basics/helper';
import { HoverCard } from '@mantine/core';

const Helper: FC<MyHelperProps> = ({
  dropdownContent,
  hoverCardProps,
  hoverCardTargetProps,
  hoverCardDropdownProps,
  customIcon,
  iconColor,
  ...props
}) => {
  return (
    <HoverCard
      withArrow
      position="bottom"
      arrowSize={5}
      transition={'scale'}
      transitionDuration={300}
      {...hoverCardProps}
    >
      <HoverCard.Target {...hoverCardTargetProps}>
        <div>
          {customIcon ? (
            customIcon
          ) : (
            <Icon size="xs">
              <Help color={iconColor || 'var(--dark4)'} />
            </Icon>
          )}
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown {...hoverCardDropdownProps}>
        <div className={styles.contentWrapper}>{dropdownContent}</div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default memo(Helper);
