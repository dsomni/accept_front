import { useLocale } from '@hooks/useLocale';
import {
  NumberInput,
  Radio,
  RadioGroup,
  TextInput,
} from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useMemo } from 'react';
import TagSelector from '../TagSelector/TagSelector';
import styles from './mainInfo.module.css';

const MainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  const innitialTags = useMemo(() => form.values.tags, []); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      <TextInput
        size="lg"
        label={capitalize(locale.tasks.form.title)}
        required
        {...form.getInputProps('title')}
      />
      <TagSelector
        initialTags={innitialTags}
        setUsed={(value) => form.setFieldValue('tags', value)}
      />
      <NumberInput
        size="lg"
        label={capitalize(locale.tasks.form.grade)}
        required
        {...form.getInputProps('grade')}
      />
      <div className={styles.radioGroups}>
        <RadioGroup
          size="lg"
          label={capitalize(locale.tasks.form.isCode)}
          {...form.getInputProps('type')}
          onChange={(value) => {
            form.setFieldValue('type', value);
            value === 'text'
              ? form.setFieldValue('checkType', 'tests')
              : () => {};
          }}
        >
          <Radio value="code">
            {capitalize(locale.tasks.form.codeType)}
          </Radio>
          <Radio value="text">
            {capitalize(locale.tasks.form.textType)}
          </Radio>
        </RadioGroup>

        {form.values.type === 'code' && (
          <RadioGroup
            size="lg"
            label={capitalize(locale.tasks.form.checkType)}
            {...form.getInputProps('checkType')}
          >
            <Radio value="tests">
              {capitalize(locale.tasks.form.tests)}
            </Radio>
            <Radio value="checker">
              {capitalize(locale.tasks.form.checker)}
            </Radio>
          </RadioGroup>
        )}
      </div>
    </div>
  );
};

export default memo(MainInfo);
