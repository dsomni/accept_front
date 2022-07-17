import { FC, memo } from 'react';
import {
  InputWrapper as MantineInputWrapper,
  InputWrapperProps,
} from '@mantine/core';
import styles from './inputWrapper.module.css';

const InputWrapper: FC<InputWrapperProps> = (props) => {
  return (
    <MantineInputWrapper
      classNames={{
        error: styles.error,
      }}
      {...props}
    >
      {props.children}
    </MantineInputWrapper>
  );
};

export default memo(InputWrapper);
