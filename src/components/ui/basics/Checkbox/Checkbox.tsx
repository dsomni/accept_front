import { FC, memo } from 'react';
import {
  CheckboxProps,
  Checkbox as MantineCheckbox,
} from '@mantine/core';
interface Props extends CheckboxProps {
  shrink?: boolean;
}

const Checkbox: FC<Props> = ({ shrink, ...props }) => {
  return (
    <div>
      <MantineCheckbox
        size={shrink ? 'xs' : 'sm'}
        {...props}
        classNames={{
          ...props.classNames,
        }}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </div>
  );
};

export default memo(Checkbox);
