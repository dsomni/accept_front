import { FC, memo } from 'react';
import inputStyles from '@styles/ui/input.module.css';
import {
  Textarea as MantineTextarea,
  TextareaProps,
} from '@mantine/core';
import { Helper } from '@ui/basics';
import { IDropdownContent } from '@custom-types/ui/basics/helper';
import styles from './textArea.module.css';

interface Props extends TextareaProps {
  helperContent?: IDropdownContent;
  shrink?: boolean;
  monospace?: boolean;
}

const TextArea: FC<Props> = ({
  helperContent,
  shrink,
  monospace,
  ...props
}) => {
  return (
    <div
      className={`${inputStyles.wrapper} ${
        shrink ? inputStyles.shrink : ''
      }`}
    >
      <div className={inputStyles.labelWrapper}>
        <div className={inputStyles.label}>
          {props.label}
          {props.required && (
            <div className={inputStyles.labelRequired}>*</div>
          )}
        </div>
        {helperContent && <Helper dropdownContent={helperContent} />}
      </div>
      <MantineTextarea
        size={shrink ? 'md' : 'lg'}
        {...props}
        classNames={{
          ...props.classNames,
          input:
            props?.classNames?.input +
            (monospace ? ' ' + styles.monospace : ''),
        }}
        label={undefined}
      />
    </div>
  );
};

export default memo(TextArea);
