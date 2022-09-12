import { FC, memo, useEffect, useMemo, useState } from 'react';
import { HoverCard, Button as MantineButton } from '@mantine/core';
import styles from './button.module.css';
import { MyButtonProps } from '@custom-types/ui/basics/button';

const Button: FC<MyButtonProps> = ({
  hoverCardProps,
  hoverCardDropdownProps,
  hoverCardTargetProps,
  targetWrapperStyle,
  buttonWrapperStyle,
  dropdownContent,
  kind,
  variant,
  ...buttonProps
}) => {
  const [bgColor, setBgColor] = useState('#fff)');
  const [mainColor, setMainColor] = useState('var(--primary)');
  const [hoverColor, setHoverColor] = useState('var(--secondary');
  const [fontWeight, setFontWeight] = useState(600);

  useEffect(() => {
    switch (kind) {
      case 'positive':
        switch (variant) {
          case 'outline':
            setBgColor('#fff');
            setMainColor('var(--positive)');
            setHoverColor('var(--positive-light2)');
            setFontWeight(400);
            break;
          case 'light':
            setBgColor('var(--positive-light)');
            setMainColor('var(--positive)');
            setHoverColor('var(--positive-light)');
            setFontWeight(600);
            break;
          default:
            setBgColor('var(--positive)');
            setMainColor('#fff');
            setHoverColor('var(--positive-light)');
            setFontWeight(600);
            break;
        }
        break;
      case 'negative':
        switch (variant) {
          case 'outline':
            setBgColor('#fff');
            setMainColor('var(--negative)');
            setHoverColor('var(--negative-light2)');
            setFontWeight(400);
            break;
          case 'light':
            setBgColor('var(--negative-light)');
            setMainColor('var(--negative)');
            setHoverColor('var(--negative-light)');
            setFontWeight(600);
            break;
          default:
            setBgColor('var(--negative)');
            setMainColor('#fff');
            setHoverColor('var(--negative-light)');
            setFontWeight(600);
            break;
        }
        break;
      default:
        switch (variant) {
          case 'outline':
            setBgColor('#fff');
            setMainColor('var(--primary)');
            setHoverColor('var(--primary-light)');
            setFontWeight(400);
            break;
          case 'light':
            setBgColor('var(--primary-light)');
            setMainColor('var(--primary)');
            setHoverColor('var(--secondary-light)');
            setFontWeight(600);
            break;
          default:
            setBgColor('var(--primary)');
            setMainColor('#fff');
            setHoverColor('var(--secondary)');
            setFontWeight(600);
            break;
        }
        break;
    }
  }, [kind, variant]);

  const button = useMemo(
    () => (
      <>
        <MantineButton
          styles={{
            label: {
              fontSize: 'var(--font-size--btn)',
              lineHeight: 'var(--font-size-btn-l)',
              color: buttonProps.disabled
                ? 'var(--dark2)'
                : mainColor,
              fontWeight: fontWeight,
            },
            root: {
              backgroundColor: buttonProps.disabled
                ? 'var(--dark5) !important'
                : bgColor,
              padding: 'var(--spacer-xs) var(--spacer-s)',
              height: 'fit-content',
              borderColor: buttonProps.disabled
                ? 'var(--dark2)'
                : mainColor,
              '&:hover': {
                backgroundColor: hoverColor,
              },
            },
          }}
          {...buttonProps}
        />
      </>
    ),
    [bgColor, buttonProps, fontWeight, hoverColor, mainColor]
  );

  return (
    <HoverCard
      withArrow
      position="bottom"
      arrowSize={5}
      transition={'scale'}
      transitionDuration={300}
      {...hoverCardProps}
    >
      <div style={targetWrapperStyle}>
        <HoverCard.Target {...hoverCardTargetProps}>
          <div style={buttonWrapperStyle}>{button}</div>
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
