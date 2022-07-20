import { FC, memo, ReactNode } from 'react';
import {
  InputWrapper as MantineInputWrapper,
  InputWrapperProps,
} from '@mantine/core';
import styles from './inputWrapper.module.css';
import { Helper } from '@ui/Helper/Helper';

interface Props extends InputWrapperProps {
  helperContent?: string | ReactNode;
}

const InputWrapper: FC<Props> = (props) => {
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
