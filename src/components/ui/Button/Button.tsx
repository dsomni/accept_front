import {
  FC,
  memo,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {
  Button as MantineButton,
  ButtonProps,
  Popover,
  PopoverProps,
} from '@mantine/core';
import styles from './button.module.css';

interface Props extends ButtonProps<'button'> {
  popoverProps?: Omit<
    PopoverProps,
    'opened' | 'children' | 'target' | 'component'
  >;
  popoverContent?: string | ReactNode;
  kind?: 'positive' | 'negative';
  href?: string;
}

const Button: FC<Props> = ({
  popoverProps,
  popoverContent,
  kind,
  variant,
  ...buttonProps
}) => {
  const [opened, setOpened] = useState(false);

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
        {!buttonProps.href ? (
          <MantineButton
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
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
        ) : (
          <MantineButton
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
            component="a"
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
            {...(buttonProps as ButtonProps<'a'>)}
          />
        )}
      </>
    ),
    [bgColor, buttonProps, fontWeight, hoverColor, mainColor]
  );

  return (
    <Popover
      disabled={!!!popoverContent}
      target={button}
      withArrow
      opened={opened}
      position="bottom"
      placement="center"
      arrowSize={5}
      transition={'scale'}
      transitionDuration={300}
      {...popoverProps}
      style={{ ...popoverProps?.style, ...buttonProps.style }}
    >
      <div className={styles.popoverContentWrapper}>
        {popoverContent}
      </div>
    </Popover>
  );
};

export default memo(Button);
