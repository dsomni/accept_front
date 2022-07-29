import { useLocale } from '@hooks/useLocale';
import { TextInput } from '@mantine/core';

import { FC, memo } from 'react';
import styles from './mainInfo.module.css';
import { CustomEditor } from '@ui/basics';

const MainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <TextInput
        classNames={{
          label: styles.label,
        }}
        size="lg"
        label={locale.tournament.form.title}
        required
        {...form.getInputProps('title')}
      />
      <CustomEditor
        classNames={{
          label: styles.label,
        }}
        label={locale.tournament.form.description}
        onChange={(value: string) =>
          form.setFieldValue('description', value)
        }
        {...form.getInputProps('description')}
      />
    </div>
  );
};

export default memo(MainInfo);
