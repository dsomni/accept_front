import CustomEditor from '@components/CustomEditor/CustomEditor';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';
import styles from './taskDescriptionInfo.module.css';

const TaskDescriptionInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default memo(TaskDescriptionInfo);
