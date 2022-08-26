import { useLocale } from '@hooks/useLocale';
import { FC, memo, useMemo } from 'react';
import styles from './mainInfo.module.css';
import { CustomEditor, TextInput, NumberInput } from '@ui/basics';
import { TagSelector } from '@ui/selectors';
import stepperStyles from '@styles/ui/stepper.module.css';

const MainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const initialTags = useMemo(
    () => {
      return form.values.tags;
    },
    [form.values.spec] // eslint-disable-line
  );

  return (
    <>
      <TextInput
        classNames={{
          label: stepperStyles.label,
        }}
        size="lg"
        label={locale.assignmentSchema.form.title}
        required
        onBlur={() => {
          form.validateField('title');
        }}
        {...form.getInputProps('title')}
      />
      <CustomEditor
        classNames={{
          label: stepperStyles.label,
        }}
        label={locale.task.form.description}
        form={form}
        name={'description'}
      />
      <TagSelector
        classNames={{
          label: stepperStyles.label,
        }}
        initialTags={initialTags}
        setUsed={(value) => form.setFieldValue('tags', value)}
        fetchURL={'assignment_tag/list'}
        addURL={'assignment_tag/add'}
        updateURL={'assignment_tag/edit'}
        deleteURL={'assignment_tag/delete'}
        form={form}
        field={'tags'}
      />
      <NumberInput
        classNames={{
          label: stepperStyles.label,
        }}
        size="lg"
        label={locale.assignmentSchema.form.defaultDuration}
        min={0}
        onBlur={() => {
          form.validateField('defaultDuration');
        }}
        {...form.getInputProps('defaultDuration')}
      />
    </>
  );
};

export default memo(MainInfo);
