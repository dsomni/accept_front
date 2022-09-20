import { FC, ReactNode, memo } from 'react';
import inputStyles from '@styles/ui/input.module.css';
import { Helper } from '@ui/basics';
import {
  DatePickerProps,
  DatePicker as MantineDatePicker,
} from '@mantine/dates';
import { useLocale } from '@hooks/useLocale';
import 'dayjs/locale/ru';

interface Props extends DatePickerProps {
  helperContent?: string | ReactNode;
}

const DatePicker: FC<Props> = ({ helperContent, ...props }) => {
  const { lang } = useLocale();

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
      <MantineDatePicker
        size="lg"
        {...props}
        label={undefined}
        locale={lang}
      />
    </div>
  );
};

export default memo(DatePicker);
