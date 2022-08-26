import { ReactNode } from 'react';
import { InputWrapperProps } from '@mantine/core';

export interface MyInputWrapperProps extends InputWrapperProps {
  helperContent?: string | ReactNode;
}
