import { useLocale } from '@hooks/useLocale';
import { Group, Stepper } from '@mantine/core';

import { FC, memo, useState } from 'react';
import stepperStyles from '@styles/ui/stepper.module.css';
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
import Button from '@ui/Button/Button';

const LAST_PAGE = 5;

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
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((current) =>
      current < LAST_PAGE ? current + 1 : current
    );
  const prevStep = () =>
    setCurrentStep((current) =>
      current > 0 ? current - 1 : current
    );

  return (
    <>
      <Stepper
        className={stepperStyles.stepper}
        iconPosition="right"
        active={currentStep}
        onStepClick={setCurrentStep}
        breakpoint={1000}
      >
        <Stepper.Step
          label={locale.task.form.steps.first}
          description={locale.task.form.steps.mainInfo}
        />
        <Stepper.Step
          label={locale.task.form.steps.second}
          description={locale.task.form.steps.constraints}
        />
        <Stepper.Step
          label={locale.task.form.steps.third}
          description={locale.task.form.steps.description}
        />
        <Stepper.Step
          label={locale.task.form.steps.fourth}
          description={locale.task.form.steps.examples}
        />
        <Stepper.Step
          label={locale.task.form.steps.fifth}
          description={locale.task.form.steps.tests}
        />
        <Stepper.Step
          label={locale.task.form.steps.sixth}
          description={locale.task.form.steps.preview}
        />
      </Stepper>
      <form onSubmit={() => {}}>
        {currentStep === 0 && (
          <MainInfo
            form={form}
            taskTypes={taskTypes}
            taskCheckTypes={taskCheckTypes}
          />
        )}

        {currentStep === 1 && <ConstraintsInfo form={form} />}
        {currentStep === 2 && (
          <DescriptionInfo
            form={form}
            hintAlarmTypes={hintAlarmTypes}
          />
        )}
        {currentStep === 3 && <Examples form={form} />}
        {currentStep === 4 && form.values.checkType === '0' && (
          <Tests form={form} />
        )}
        {currentStep === 4 && form.values.checkType === '1' && (
          <Checker form={form} />
        )}
        {currentStep === LAST_PAGE && <Preview form={form} />}
        <Group
          position="center"
          mt="xl"
          className={stepperStyles.buttons}
        >
          {currentStep !== 0 && (
            <Button variant="outline" onClick={prevStep}>
              {locale.form.back}
            </Button>
          )}
          <Button
            onClick={
              currentStep !== LAST_PAGE ? nextStep : handleSubmit
            }
            type="button"
          >
            {currentStep === LAST_PAGE
              ? buttonLabel
              : locale.form.next}
          </Button>
        </Group>
      </form>
    </>
  );
};

export default memo(Form);
