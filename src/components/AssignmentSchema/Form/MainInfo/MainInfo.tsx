import { useLocale } from '@hooks/useLocale';
import { NumberInput, TextInput } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useMemo } from 'react';
import styles from './mainInfo.module.css';
import CustomEditor from '@components/CustomEditor/CustomEditor';
import TagSelector from '@components/TagSelector/TagSelector';

const MainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const initialTags = useMemo(
    () => {
      return form.values.tags;
    },
    [form.values.spec] // eslint-disable-line
  );

  return (
    <div className={styles.wrapper}>
      <TextInput
        classNames={{
          label: styles.label,
        }}
        size="lg"
        label={capitalize(locale.assignmentSchema.form.title)}
        required
        {...form.getInputProps('title')}
      />
      <TagSelector
        classNames={{
          label: styles.label,
        }}
        initialTags={initialTags}
        setUsed={(value) => form.setFieldValue('tags', value)}
        fetchURL={'assignment_tags/list'}
        addURL={'assignment_tags/add'}
        updateURL={'assignment_tags/edit'}
        deleteURL={'assignment_tags/delete'}
      />
      <NumberInput
        classNames={{
          label: styles.label,
        }}
        size="lg"
        label={capitalize(
          locale.assignmentSchema.form.defaultDuration
        )}
        {...form.getInputProps('defaultDuration')}
      />
      <CustomEditor
        classNames={{
          label: styles.label,
        }}
        label={capitalize(locale.tasks.form.description)}
        onChange={(value) => form.setFieldValue('description', value)}
        {...form.getInputProps('description')}
      />
    </div>
  );
};

export default memo(MainInfo);
