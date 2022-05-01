import { useLocale } from '@hooks/useLocale';
import {
  NumberInput,
  Radio,
  RadioGroup,
  Switch,
  TextInput,
} from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useMemo } from 'react';
import TagSelector from '@ui/TagSelector/TagSelector';
import styles from './mainInfo.module.css';

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
        label={capitalize(locale.tasks.form.title)}
        required
        {...form.getInputProps('title')}
      />
      {!form.values.isTournament && (
        <div>
          <TagSelector
            classNames={{
              label: styles.label,
            }}
            initialTags={initialTags}
            setUsed={(value: any) =>
              form.setFieldValue('tags', value)
            }
            fetchURL={'tags/list'}
            addURL={'tags/add'}
            updateURL={'tags/edit'}
            deleteURL={'tags/delete'}
          />
          <NumberInput
            classNames={{
              label: styles.label,
            }}
            size="lg"
            label={capitalize(locale.tasks.form.grade)}
            required
            {...form.getInputProps('grade')}
          />
        </div>
      )}
      <div className={styles.radioGroups}>
        <RadioGroup
          classNames={{
            label: styles.label,
          }}
          size="md"
          label={capitalize(locale.tasks.form.isCode)}
          {...form.getInputProps('type')}
          onChange={(value) => {
            form.setFieldValue('type', value);
            value === 'text'
              ? form.setFieldValue('checkType', 'tests')
              : () => {};
          }}
        >
          <Radio
            value="code"
            label={capitalize(locale.tasks.form.codeType)}
          />
          <Radio
            value="text"
            label={capitalize(locale.tasks.form.textType)}
          />
        </RadioGroup>

        {form.values.type === 'code' && (
          <RadioGroup
            classNames={{
              label: styles.label,
            }}
            size="md"
            label={capitalize(locale.tasks.form.checkType)}
            {...form.getInputProps('checkType')}
          >
            <Radio
              value="tests"
              label={capitalize(locale.tasks.form.tests)}
            />
            <Radio
              value="checker"
              label={capitalize(locale.tasks.form.checker)}
            />
          </RadioGroup>
        )}
        {!form.values.isTournament && (
          <Switch
            classNames={{
              label: styles.label,
            }}
            label={capitalize(locale.tasks.form.hint.title)}
            size="lg"
            {...form.getInputProps('hasHint', { type: 'checkbox' })}
          />
        )}
      </div>
    </div>
  );
};

export default memo(MainInfo);
