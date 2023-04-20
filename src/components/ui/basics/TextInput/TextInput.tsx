import { FC, memo } from 'react';
import {
  TextInput as MantineInput,
  TextInputProps,
} from '@mantine/core';
import { Helper } from '@ui/basics';
import inputStyles from '@styles/ui/input.module.css';
import { IDropdownContent } from '@custom-types/ui/basics/helper';

interface Props extends TextInputProps {
  helperContent?: IDropdownContent;
  shrink?: boolean;
}

const TextInput: FC<Props> = ({
  helperContent,
  shrink,
  ...props
}) => {
  return (
    <div
      className={`${inputStyles.wrapper} ${
        shrink ? inputStyles.shrink : ''
      }`}
    >
      {props.label && (
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
      )}
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
  );
};

export default memo(TextInput);
