import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useMemo } from 'react';
import { TagSelector } from '@ui/selectors';
import styles from './mainInfo.module.css';
import { ITaskCheckType, ITaskType } from '@custom-types/data/atomic';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { NumberInput, Radio, Switch, TextInput } from '@ui/basics';
import stepperStyles from '@styles/ui/stepper.module.css';

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

  const taskCheckTypeItems = useMemo(
    () =>
      taskCheckTypes.map((checkType) => ({
        value: checkType.spec.toString(),
        label: locale.task.form.checkTypes[checkType.spec],
      })),
    [locale, taskCheckTypes]
  );

  const taskTypeItems = useMemo(
    () =>
      taskTypes.map((taskType) => ({
        value: taskType.spec.toString(),
        label: locale.task.form.taskTypes[taskType.spec],
      })),
    [locale, taskTypes]
  );

  const handlerTaskType = useCallback(
    (value: string) => {
      form.setFieldValue('taskType', value);
      value === '1' ? form.setFieldValue('checkType', '0') : () => {};
    },
    [form]
  );

  return (
    <>
      <TextInput
        label={locale.task.form.title}
        required
        onBlur={() => {
          form.validateField('title');
        }}
        {...form.getInputProps('title')}
      />

      <TagSelector
        classNames={{
          label: stepperStyles.label,
        }}
        initialTags={initialTags}
        setUsed={(values: Item[]) => {
          form.setFieldValue('tags', values);
          form.validateField('tags');
        }}
        fetchURL={'tag/list'}
        addURL={'tag/add'}
        updateURL={'tag/edit'}
        deleteURL={'tag/delete'}
        form={form}
        field={'tags'}
      />

      <NumberInput
        label={locale.task.form.complexity}
        required
        noClampOnBlur
        hideControls
        onBlur={() => {
          form.validateField('complexity');
        }}
        {...form.getInputProps('complexity')}
      />
      <div className={styles.radioGroups}>
        <Radio
          label={locale.task.form.taskType}
          field={'taskType'}
          form={form}
          items={taskTypeItems}
          onChange={handlerTaskType}
          helperContent={
            <div>
              {locale.helpers.task.taskType.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          }
        />
        {form.values.taskType === '0' && (
          <Radio
            label={locale.task.form.checkType}
            field={'checkType'}
            form={form}
            items={taskCheckTypeItems}
            onChange={(value) =>
              form.setFieldValue('checkType', value)
            }
          />
        )}
        {!form.values.isTournament && (
          <Switch
            label={locale.task.form.hint.title}
            {...form.getInputProps('hasHint', { type: 'checkbox' })}
          />
        )}
      </div>
    </>
  );
};

export default memo(MainInfo);
