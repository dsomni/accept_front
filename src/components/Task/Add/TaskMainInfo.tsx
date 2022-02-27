import CustomEditor from '@components/CustomEditor/CustomEditor';
import { useLocale } from '@hooks/useLocale';
import {
  NumberInput,
  Radio,
  RadioGroup,
  TextInput,
} from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';
import styles from './mainInfo.module.css';

const TaskMainInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <div className={styles.wrapper}>
      <TextInput
        size="lg"
        label={capitalize(locale.tasks.add.title)}
        required
        {...form.getInputProps('title')}
      />
      <NumberInput
        size="lg"
        label={capitalize(locale.tasks.add.grade)}
        required
        {...form.getInputProps('grade')}
      />
      <div className={styles.radioGroups}>
        <RadioGroup
          size="lg"
          label={capitalize(locale.tasks.add.isCode)}
          {...form.getInputProps('type')}
          onChange={(value) => {
            form.setFieldValue('type', value);
            value === 'text'
              ? form.setFieldValue('isChecker', 'tests')
              : () => {};
          }}
        >
          <Radio value="code">
            {capitalize(locale.tasks.add.codeType)}
          </Radio>
          <Radio value="text">
            {capitalize(locale.tasks.add.textType)}
          </Radio>
        </RadioGroup>

        {form.values.type === 'code' && (
          <RadioGroup
            size="lg"
            label={capitalize(locale.tasks.add.isChecker)}
            {...form.getInputProps('isChecker')}
          >
            <Radio value="tests">
              {capitalize(locale.tasks.add.tests)}
            </Radio>
            <Radio value="checker">
              {capitalize(locale.tasks.add.checker)}
            </Radio>
          </RadioGroup>
        )}
      </div>
    </div>
  );
};

export default memo(TaskMainInfo);
