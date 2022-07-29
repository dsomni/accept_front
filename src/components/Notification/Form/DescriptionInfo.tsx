import { useLocale } from '@hooks/useLocale';
import { CustomEditor, TextInput } from '@ui/basics';
import { FC, memo } from 'react';
import stepperStyles from '@styles/ui/stepper.module.css';

const DescriptionInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <>
      <TextInput
        label={locale.notification.form.shortDescription}
        onBlur={() => {
          form.validateField('shortDescription');
        }}
        {...form.getInputProps('shortDescription')}
      />
      <CustomEditor
        classNames={{
          label: stepperStyles.label,
        }}
        label={locale.notification.form.description}
        form={form}
        name={'description'}
      />
    </>
  );
};

export default memo(DescriptionInfo);
