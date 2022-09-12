import { FC, memo } from 'react';
import { Input as MantineInput } from '@mantine/core';
import styles from './inputWrapper.module.css';
import inputStyles from '@styles/ui/input.module.css';
import { MyInputWrapperProps } from '@custom-types/ui/basics/inputWrapper';
import { Helper } from '@ui/basics';

const InputWrapper: FC<MyInputWrapperProps> = ({
  helperContent,
  ...props
}) => {
  return (
    <div className={inputStyles.wrapper}>
      <div className={inputStyles.labelWrapper}>
        <div className={inputStyles.label}>
          {props.label}
          {props.required && (
            <div className={inputStyles.labelRequired}>*</div>
          )}
        </div>
        {helperContent && <Helper dropdownContent={helperContent} />}
      </div>
      <MantineInput.Wrapper
        classNames={{
          error: styles.error,
        }}
        {...props}
        label={undefined}
      >
        {props.children}
      </MantineInput.Wrapper>
    </div>
  );
};

export default memo(InputWrapper);
