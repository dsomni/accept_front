import { FC, memo } from 'react';
import {
  TimeInput as MantineTimeInput,
  TimeInputProps,
} from '@mantine/dates';
import inputStyles from '@styles/ui/input.module.css';
import Helper from '../Helper/Helper';
import { IDropdownContent } from '@custom-types/ui/basics/helper';

interface Props extends TimeInputProps {
  helperContent?: IDropdownContent;
}

const TimeInput: FC<Props> = ({ helperContent, ...props }) => {
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
      <MantineTimeInput
        size="lg"
        withSeconds
        {...props}
        label={undefined}
      />
    </div>
  );
};

export default memo(TimeInput);
