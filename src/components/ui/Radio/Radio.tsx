import { FC, memo, ReactNode } from 'react';
import styles from './radio.module.css';
import {
  Radio as MantineRadio,
  RadioGroup,
  RadioProps,
  RadioGroupProps,
} from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { setter } from '@custom-types/ui/atomic';

const Radio: FC<{
  label: ReactNode;
  field: string;
  items: Item[];
  form: any;
  onChange?: setter<string>;
  onBlur?: () => void;
  groupProps?: RadioGroupProps;
  radioProps?: RadioProps;
}> = ({
  label,
  field,
  items,
  form,
  onChange,
  onBlur,
  groupProps,
  radioProps,
}) => {
  const { locale } = useLocale();

  return (
    <RadioGroup
      classNames={{
        label: styles.label,
        radio: styles.radio,
      }}
      size="md"
      label={label}
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
    </RadioGroup>
  );
};

export default memo(Radio);
