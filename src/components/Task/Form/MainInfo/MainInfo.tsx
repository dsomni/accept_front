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
import { ITaskCheckType, ITaskType } from '@custom-types/data/atomic';

const MainInfo: FC<{
  form: any;
  taskTypes: ITaskType[];
  taskCheckTypes: ITaskCheckType[];
}> = ({ form, taskTypes, taskCheckTypes }) => {
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

      <div>
        <TagSelector
          classNames={{
            label: styles.label,
          }}
          initialTags={initialTags}
          setUsed={(value: any) => form.setFieldValue('tags', value)}
          fetchURL={'tag/list'}
          addURL={'tag/add'}
          updateURL={'tag/edit'}
          deleteURL={'tag/delete'}
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
      <div className={styles.radioGroups}>
        <RadioGroup
          classNames={{
            label: styles.label,
          }}
          size="md"
          label={capitalize(locale.tasks.form.taskType)}
          {...form.getInputProps('type')}
          onChange={(value) => {
            form.setFieldValue('type', value);
            value === 'text'
              ? form.setFieldValue('checkType', 'tests')
              : () => {};
          }}
        >
          {taskTypes.map((taskType: ITaskType, index: number) => (
            <Radio
              value={taskType.spec.toString()}
              key={index}
              label={capitalize(
                locale.tasks.form.taskTypes[taskType.spec]
              )}
            />
          ))}
        </RadioGroup>

        {form.values.type === '0' && (
          <RadioGroup
            classNames={{
              label: styles.label,
            }}
            size="md"
            label={capitalize(locale.tasks.form.checkType)}
            {...form.getInputProps('checkType')}
          >
            {taskCheckTypes.map(
              (checkType: ITaskCheckType, index: number) => (
                <Radio
                  value={checkType.spec.toString()}
                  key={index}
                  label={capitalize(
                    locale.tasks.form.checkTypes[checkType.spec]
                  )}
                />
              )
            )}
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
