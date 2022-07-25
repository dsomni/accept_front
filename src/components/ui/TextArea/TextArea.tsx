import { FC, memo, ReactNode } from 'react';
import styles from './textArea.module.css';
import inputStyles from '@styles/ui/input.module.css';
import {
  Textarea as MantineTextarea,
  TextareaProps,
} from '@mantine/core';
import { Helper } from '@ui/Helper/Helper';

interface Props extends TextareaProps {
  helperContent?: string | ReactNode;
}

const TextArea: FC<Props> = ({ helperContent, ...props }) => {
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
      <MantineTextarea size="lg" {...props} label={undefined} />
    </div>
  );
};

export default memo(TextArea);
