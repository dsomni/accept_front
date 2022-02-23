import { useLocale } from '@hooks/useLocale';
import { NumberInput, Textarea, TextInput } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';
import styles from './mainInfo.module.css';

const TaskMainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <div className={styles.wrapper}>
      <TextInput
        label={capitalize(locale.pages.tasks.add.title)}
        required
        {...form.getInputProps('title')}
      />
      <Textarea
        label={capitalize(locale.pages.tasks.add.description)}
        required
        {...form.getInputProps('description')}
      />
      <Textarea
        label={capitalize(locale.pages.tasks.add.inputFormat)}
        required
        {...form.getInputProps('inputFormat')}
      />
      <Textarea
        label={capitalize(locale.pages.tasks.add.outputFormat)}
        required
        {...form.getInputProps('outputFormat')}
      />
      <NumberInput
        label={capitalize(locale.pages.tasks.add.grade)}
        required
        {...form.getInputProps('grade')}
      />
    </div>
  );
};

export default memo(TaskMainInfo);
