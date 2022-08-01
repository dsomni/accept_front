import { useLocale } from '@hooks/useLocale';
import { FC, memo } from 'react';
import Tests from '@components/Task/Form/Tests/Tests';
import Checker from '@components/Task/Form/Checker/Checker';
import Preview from '@components/Task/Form/Preview/Preview';
import MainInfo from '@components/Task/Form/MainInfo/MainInfo';
import DescriptionInfo from '@components/Task/Form/DescriptionInfo/DescriptionInfo';
import ConstraintsInfo from '@components/Task/Form/ConstraintsInfo/ConstraintsInfo';
import Examples from '@components/Task/Form/Examples/Examples';
import { pureCallback } from '@custom-types/ui/atomic';
import {
  ITaskCheckType,
  ITaskType,
  IHintAlarmType,
} from '@custom-types/data/atomic';
import Stepper from '@ui/Stepper/Stepper';

const stepFields = [
  ['title', 'tags', 'complexity', 'taskType', 'checkType', 'hasHint'],
  [
    'shouldRestrictLanguages',
    'allowedLanguages',
    'forbiddenLanguages',
    'constraintsTime',
    'constraintsMemory',
  ],
  [
    'description',
    'inputFormat',
    'outputFormat',
    'remark',
    'hintAlarm',
    'hintContent',
  ],
  ['examples'],
  ['checkerLang', 'checkerCode', 'tests'],
  [],
];

const Form: FC<{
  form: any;
  handleSubmit: pureCallback<void>;
  buttonLabel: string;
  taskTypes: ITaskType[];
  taskCheckTypes: ITaskCheckType[];
  hintAlarmTypes: IHintAlarmType[];
}> = ({
  form,
  handleSubmit,
  buttonLabel,
  taskTypes,
  taskCheckTypes,
  hintAlarmTypes,
}) => {
  const { locale } = useLocale();

  return (
    <>
      <Stepper
        buttonLabel={buttonLabel}
        form={form}
        handleSubmit={handleSubmit}
        stepFields={stepFields}
        pages={[
          <MainInfo
            key="0"
            form={form}
            taskTypes={taskTypes}
            taskCheckTypes={taskCheckTypes}
          />,
          <ConstraintsInfo key="1" form={form} />,
          <DescriptionInfo
            key="2"
            form={form}
            hintAlarmTypes={hintAlarmTypes}
          />,
          <Examples key="3" form={form} />,
          <>
            {form.values.checkType === '0' ? (
              <Tests key="4" form={form} />
            ) : (
              <Checker key="4" form={form} />
            )}
          </>,
          <Preview key="5" form={form} />,
        ]}
        labels={locale.task.form.steps.labels}
        descriptions={locale.task.form.steps.descriptions}
      />
    </>
  );
};

export default memo(Form);
