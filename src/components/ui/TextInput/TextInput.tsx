import { FC, memo, ReactNode } from 'react';
import styles from './textInput.module.css';
import {
  TextInput as MantineInput,
  TextInputProps,
} from '@mantine/core';
import { Helper } from '@ui/Helper/Helper';

interface Props extends TextInputProps {
  helperContent?: string | ReactNode;
}

const TextInput: FC<Props> = (props) => {
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
      <MantineInput size="lg" {...props} label={undefined} />
    </div>
  );
};

export default memo(TextInput);
