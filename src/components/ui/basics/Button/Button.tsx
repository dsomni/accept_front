import { FC, memo } from 'react';
import { HoverCard, Button as MantineButton } from '@mantine/core';
import styles from './button.module.css';
import { MyButtonProps } from '@custom-types/ui/basics/button';

const Button: FC<MyButtonProps> = ({
  hoverCardProps,
  hoverCardDropdownProps,
  hoverCardTargetProps,
  targetWrapperStyle,
  targetWrapperClassName,
  buttonWrapperStyle,
  dropdownContent,
  kind,
  variant,
  shrink,
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
      <div
        className={targetWrapperClassName}
        style={targetWrapperStyle}
      >
        <HoverCard.Target {...hoverCardTargetProps}>
          <div
            style={buttonWrapperStyle}
            className={
              `${styles.buttonWrapper} ${
                shrink ? styles.shrink : ''
              }` +
              ' ' +
              (props.disabled
                ? styles.disabled
                : `${kind && styles[kind]} ${
                    variant && styles[variant]
                  }`)
            }
          >
            <MantineButton
              classNames={{
                label: styles.label,
                root: styles.root,
              }}
              component={props.onClick ? 'button' : 'a'}
              {...props}
            />
          </div>
        </HoverCard.Target>
      </div>
      {!!dropdownContent && (
        <HoverCard.Dropdown {...hoverCardDropdownProps}>
          <div className={styles.dropdownContentWrapper}>
            {dropdownContent}
          </div>
        </HoverCard.Dropdown>
      )}
    </HoverCard>
  );
};

export default memo(Button);
