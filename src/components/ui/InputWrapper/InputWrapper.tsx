import { FC, memo, ReactNode } from 'react';
import {
  InputWrapper as MantineInputWrapper,
  InputWrapperProps,
} from '@mantine/core';
import styles from './inputWrapper.module.css';
import inputStyles from '@styles/ui/input.module.css';
import { Helper } from '@ui/Helper/Helper';

interface Props extends InputWrapperProps {
  helperContent?: string | ReactNode;
}

const InputWrapper: FC<Props> = ({ helperContent, ...props }) => {
  return (
    <div className={inputStyles.wrapper}>
      <div className={inputStyles.labelWrapper}>
        <div className={inputStyles.label}>
          {props.label}
          {props.required && (
            <div className={inputStyles.labelRequired}>*</div>
          )}
        </div>
        {helperContent && <Helper content={helperContent} />}
      </div>
      <MantineInputWrapper
        classNames={{
          error: styles.error,
        }}
        {...props}
        label={undefined}
      >
        {props.children}
      </MantineInputWrapper>
    </div>
  );
};

export default memo(InputWrapper);
