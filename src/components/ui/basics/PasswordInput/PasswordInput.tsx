import { FC, memo } from 'react';
import inputStyles from '@styles/ui/input.module.css';
import {
  PasswordInput as MantinePasswordInput,
  PasswordInputProps,
} from '@mantine/core';
import { Helper } from '@ui/basics';
import { IDropdownContent } from '@custom-types/ui/basics/helper';

interface Props extends PasswordInputProps {
  helperContent?: IDropdownContent;
}

const PasswordInput: FC<Props> = ({ helperContent, ...props }) => {
  return (
    <div className={inputStyles.wrapper}>
      <div className={inputStyles.labelWrapper}>
        <div className={inputStyles.label}>
          {props.label}
          {props.required && (
            <div className={inputStyles.labelRequired}>*</div>
          )}
        </div>
        {helperContent && <Helper dropdownContent={helperContent} />}
      </div>
      <MantinePasswordInput size="lg" {...props} label={undefined} />
    </div>
  );
};

export default memo(PasswordInput);
