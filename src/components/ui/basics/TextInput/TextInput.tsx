import { FC, ReactNode, memo } from 'react';
import inputStyles from '@styles/ui/input.module.css';
import {
  TextInput as MantineInput,
  TextInputProps,
} from '@mantine/core';
import { Helper } from '@ui/basics';

interface Props extends TextInputProps {
  helperContent?: string | ReactNode;
  shrink?: boolean;
}

const TextInput: FC<Props> = ({
  helperContent,
  shrink,
  ...props
}) => {
  return (
    <div className={shrink ? inputStyles.shrink : ''}>
      <div className={inputStyles.wrapper}>
        <div className={inputStyles.labelWrapper}>
          <div className={inputStyles.label}>
            {props.label}
            {props.required && (
              <div className={inputStyles.labelRequired}>*</div>
            )}
          </div>
          {helperContent && (
            <Helper dropdownContent={helperContent} />
          )}
        </div>
        <MantineInput
          size={shrink ? 'sm' : 'md'}
          {...props}
          classNames={{
            error: props.classNames?.error || inputStyles.error,
            ...props.classNames,
          }}
          label={undefined}
        />
      </div>
    </div>
  );
};

export default memo(TextInput);
