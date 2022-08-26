import { FC, ReactNode, memo } from 'react';
import styles from './radio.module.css';
import {
  Radio as MantineRadio,
  RadioGroupProps,
  RadioProps,
} from '@mantine/core';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { setter } from '@custom-types/ui/atomic';
import { Helper } from '@ui/basics';

const Radio: FC<{
  label: ReactNode;
  field: string;
  items: Item[];
  form: any;
  onChange?: setter<string>;
  onBlur?: () => void;
  groupProps?: RadioGroupProps;
  radioProps?: RadioProps;
  helperContent?: string | ReactNode;
}> = ({
  label,
  field,
  items,
  form,
  onChange,
  onBlur,
  groupProps,
  radioProps,
  helperContent,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.labelWrapper}>
        <div className={styles.label}>{label}</div>
        {helperContent && <Helper dropdownContent={helperContent} />}
      </div>

      <MantineRadio.Group
        classNames={{
          label: styles.radioLabel,
          radio: styles.radio,
        }}
        size="md"
        {...groupProps}
        {...form.getInputProps(field)}
        onChange={onChange}
        onBlur={onBlur}
      >
        {items.map((item: Item, index: number) => (
          <MantineRadio
            {...radioProps}
            value={item.value}
            key={index}
            label={item.label}
          />
        ))}
      </MantineRadio.Group>
    </div>
  );
};

export default memo(Radio);
