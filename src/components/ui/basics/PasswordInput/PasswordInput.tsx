import { FC, memo, ReactNode } from 'react';
import styles from './passwordInput.module.css';
import inputStyles from '@styles/ui/input.module.css';
import {
  PasswordInput as MantinePasswordInput,
  PasswordInputProps,
} from '@mantine/core';
import { Helper } from '@ui/basics';

interface Props extends PasswordInputProps {
  helperContent?: string | ReactNode;
}

const PasswordInput: FC<Props> = ({ helperContent, ...props }) => {
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
      <MantinePasswordInput size="lg" {...props} label={undefined} />
    </div>
  );
};

export default memo(PasswordInput);
