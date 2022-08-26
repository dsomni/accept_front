import { CustomEditor, NumberInput, Radio } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';
import { FC, memo, useMemo } from 'react';
import styles from './descriptionInfo.module.css';
import { IHintAlarmType } from '@custom-types/data/atomic';
import stepperStyles from '@styles/ui/stepper.module.css';

const DescriptionInfo: FC<{
  form: any;
  hintAlarmTypes: IHintAlarmType[];
}> = ({ form, hintAlarmTypes }) => {
  const { locale } = useLocale();

  const hintAlarmTypeItems = useMemo(
    () =>
      hintAlarmTypes.map((alarmType) => ({
        value: alarmType.spec.toString(),
        label: locale.task.form.hint.hintAlarmTypes[alarmType.spec],
      })),
    [locale, hintAlarmTypes]
  );

  return (
    <>
      <CustomEditor
        classNames={{
          label: stepperStyles.label,
        }}
        label={locale.task.form.description}
        form={form}
        name={'description'}
      />
      <CustomEditor
        classNames={{
          label: stepperStyles.label,
        }}
        label={locale.task.form.inputFormat}
        form={form}
        name={'inputFormat'}
      />
      <CustomEditor
        classNames={{
          label: stepperStyles.label,
        }}
        label={locale.task.form.outputFormat}
        form={form}
        name={'outputFormat'}
      />

      <CustomEditor
        classNames={{
          label: stepperStyles.label,
        }}
        label={locale.task.form.remark}
        form={form}
        name={'remark'}
      />

      {!form.values.isTournament && form.values['hasHint'] && (
        <div className={styles.hintWrapper}>
          <div className={stepperStyles.label}>
            {locale.task.form.hint.title}
          </div>
          <Radio
            label={locale.task.form.hint.alarmType}
            form={form}
            field={'hintAlarmType'}
            items={hintAlarmTypeItems}
            onChange={(value) =>
              form.setFieldValue('hintAlarmType', value)
            }
            onBlur={() => form.validateField('hintAlarmType')}
          />
          <NumberInput
            size="md"
            label={locale.task.form.hint.showAfter}
            hideControls
            min={0}
            onBlur={() => form.validateField('hintAlarm')}
            {...form.getInputProps('hintAlarm')}
          />
          <CustomEditor
            classNames={{
              label: stepperStyles.subLabel,
            }}
            label={locale.task.form.hint.text}
            form={form}
            name={'hintContent'}
          />
        </div>
      )}
    </>
  );
};

export default memo(DescriptionInfo);
