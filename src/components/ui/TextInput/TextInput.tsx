import { FC, memo, ReactNode } from 'react';
import styles from './textInput.module.css';
import inputStyles from '@styles/ui/input.module.css';
import {
  TextInput as MantineInput,
  TextInputProps,
} from '@mantine/core';
import { Helper } from '@ui/Helper/Helper';

interface Props extends TextInputProps {
  helperContent?: string | ReactNode;
}

const TextInput: FC<Props> = ({ helperContent, ...props }) => {
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
      <MantineInput size="lg" {...props} label={undefined} />
    </div>
  );
};

export default memo(TextInput);
