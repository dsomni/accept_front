import { FC, memo, ReactNode } from 'react';
import styles from './numberInput.module.css';
import inputStyles from '@styles/ui/input.module.css';
import {
  NumberInput as MantineNumberInput,
  NumberInputProps,
} from '@mantine/core';
import { Helper } from '@ui/basics';

interface Props extends NumberInputProps {
  helperContent?: string | ReactNode;
}

const NumberInput: FC<Props> = ({ helperContent, ...props }) => {
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
      <MantineNumberInput size="lg" {...props} label={undefined} />
    </div>
  );
};

export default memo(NumberInput);
