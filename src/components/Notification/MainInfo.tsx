import { useLocale } from '@hooks/useLocale';
import { TextInput } from '@ui/basics';
import { FC, memo } from 'react';

const MainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <>
      <TextInput
        label={locale.notification.form.title}
        required
        onBlur={() => {
          form.validateField('title');
        }}
        {...form.getInputProps('title')}
      />
      <TextInput
        label={locale.notification.form.author}
        onBlur={() => {
          form.validateField('author');
        }}
        {...form.getInputProps('author')}
      />
    </>
  );
};

export default memo(MainInfo);
