import { FC, memo, ReactNode } from 'react';
import styles from './numberInput.module.css';
import {
  NumberInput as MantineNumberInput,
  NumberInputProps,
} from '@mantine/core';
import { Helper } from '@ui/Helper/Helper';

interface Props extends NumberInputProps {
  helperContent?: string | ReactNode;
}

const NumberInput: FC<Props> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.labelWrapper}>
        <div className={styles.label}>
          {props.label}
          {props.required && (
            <div className={styles.labelRequired}>*</div>
          )}
        </div>
        {props.helperContent && (
          <Helper content={props.helperContent} />
        )}
      </div>
      <MantineNumberInput size="lg" {...props} label={undefined} />
    </div>
  );
};

export default memo(NumberInput);
