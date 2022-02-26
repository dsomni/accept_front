import CustomEditor from '@components/CustomEditor/CustomEditor';
import { useLocale } from '@hooks/useLocale';
import { NumberInput, TextInput } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';
import styles from './mainInfo.module.css';

const TaskMainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <div className={styles.wrapper}>
      <TextInput
        label={capitalize(locale.tasks.add.title)}
        required
        {...form.getInputProps('title')}
      />
      <CustomEditor
        label={capitalize(locale.tasks.add.description)}
        onChange={(value) => form.setFieldValue('description', value)}
        {...form.getInputProps('description')}
      />
      <CustomEditor
        label={capitalize(locale.tasks.add.inputFormat)}
        onChange={(value) => form.setFieldValue('inputFormat', value)}
        {...form.getInputProps('inputFormat')}
      />
      <CustomEditor
        label={capitalize(locale.tasks.add.outputFormat)}
        onChange={(value) =>
          form.setFieldValue('outputFormat', value)
        }
        {...form.getInputProps('outputFormat')}
      />
      <NumberInput
        label={capitalize(locale.tasks.add.grade)}
        required
        {...form.getInputProps('grade')}
      />
    </div>
  );
};

export default memo(TaskMainInfo);
