import { FC, memo } from 'react';
import { Select as MantineSelect, SelectProps } from '@mantine/core';
import { Helper } from '@ui/basics';
import inputStyles from '@styles/ui/input.module.css';
import { IDropdownContent } from '@custom-types/ui/basics/helper';

interface Props extends SelectProps {
  helperContent?: IDropdownContent;
  shrink?: boolean;
}

const Select: FC<Props> = ({ helperContent, shrink, ...props }) => {
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
      <MantineSelect
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

export default memo(Select);
