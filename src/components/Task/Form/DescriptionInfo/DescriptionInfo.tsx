import CustomEditor from '@ui/CustomEditor/CustomEditor';
import { useLocale } from '@hooks/useLocale';
import { RadioGroup, Radio, NumberInput } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';
import styles from './descriptionInfo.module.css';
import { IHintAlarmType } from '@custom-types/data/atomic';

const DescriptionInfo: FC<{
  form: any;
  hintAlarmTypes: IHintAlarmType[];
}> = ({ form, hintAlarmTypes }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <CustomEditor
        classNames={{
          label: styles.label,
        }}
        label={capitalize(locale.task.form.description)}
        onChange={(value) => form.setFieldValue('description', value)}
        {...form.getInputProps('description')}
      />
      <CustomEditor
        classNames={{
          label: styles.label,
        }}
        label={capitalize(locale.task.form.inputFormat)}
        onChange={(value) => form.setFieldValue('inputFormat', value)}
        {...form.getInputProps('inputFormat')}
      />
      <CustomEditor
        classNames={{
          label: styles.label,
        }}
        label={capitalize(locale.task.form.outputFormat)}
        onChange={(value) =>
          form.setFieldValue('outputFormat', value)
        }
        {...form.getInputProps('outputFormat')}
      />

      <CustomEditor
        classNames={{
          label: styles.label,
        }}
        label={capitalize(locale.task.form.remark)}
        onChange={(value) => form.setFieldValue('remark', value)}
        {...form.getInputProps('remark')}
      />

      {!form.values.isTournament && form.values['hasHint'] && (
        <div className={styles.hintWrapper}>
          <div className={styles.label}>
            {capitalize(locale.task.form.hint.title)}
          </div>
          <RadioGroup
            size="lg"
            classNames={{
              label: styles.subLabel,
            }}
            label={capitalize(locale.task.form.hint.alarmType)}
            {...form.getInputProps('hintAlarmType')}
            onChange={(value) =>
              form.setFieldValue('hintAlarmType', value)
            }
          >
            {hintAlarmTypes.map(
              (hintAlarmType: IHintAlarmType, index: number) => (
                <Radio
                  value={hintAlarmType.spec.toString()}
                  key={index}
                  size="sm"
                  label={capitalize(
                    locale.task.form.hint.hintAlarmTypes[
                      hintAlarmType.spec
                    ]
                  )}
                />
              )
            )}
          </RadioGroup>
          <NumberInput
            label={capitalize(locale.task.form.hint.showAfter)}
            classNames={{
              label: styles.subLabel,
            }}
            size="md"
            hideControls
            min={0}
            {...form.getInputProps('hintAlarm')}
          />
          <CustomEditor
            classNames={{
              label: styles.subLabel,
            }}
            label={capitalize(locale.task.form.hint.text)}
            onChange={(value) => form.setFieldValue('hintContent')}
            {...form.getInputProps('hintContent')}
          />
        </div>
      )}
    </div>
  );
};

export default memo(DescriptionInfo);
