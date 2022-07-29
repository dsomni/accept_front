import { useLocale } from '@hooks/useLocale';
import { Group, Stepper } from '@mantine/core';

import { FC, memo, useCallback, useState } from 'react';
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
import { AlertCircle } from 'tabler-icons-react';
import { Button } from '@ui/basics';

const LAST_PAGE = 5;

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
  const [currentStep, setCurrentStep] = useState(0);

  const validateStep = useCallback(
    (step: number) => {
      var error = false;
      stepFields[step].forEach((field: string) => {
        const res = form.validateField(field);
        error = error || res.hasError;
      });
      return error;
    },
    [form]
  );

  const nextStep = useCallback(() => {
    setCurrentStep((current) => {
      if (!validateStep(current)) {
        return current < LAST_PAGE ? current + 1 : current;
      }
      return current;
    });
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((current) => {
      return current > 0 ? current - 1 : current;
    });
  }, []);

  const getErrorsStep = useCallback(
    (step: number) => {
      let error = false;
      stepFields[step].forEach((field: string) => {
        if (form.errors[field] !== undefined) {
          error = true;
          return;
        }
      });
      return error;
    },
    [form.errors]
  );

  const onStepperChange = useCallback(
    (newStep: number) => {
      if (newStep < currentStep || !validateStep(currentStep)) {
        setCurrentStep(newStep);
      }
    },
    [currentStep, validateStep]
  );

  return (
    <>
      <Stepper
        className={stepperStyles.stepper}
        iconPosition="right"
        active={currentStep}
        onStepClick={onStepperChange}
        breakpoint={1000}
      >
        <Stepper.Step
          label={locale.task.form.steps.first}
          description={locale.task.form.steps.mainInfo}
          icon={
            getErrorsStep(0) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(0) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(0) ? 'red' : undefined}
        />
        <Stepper.Step
          label={locale.task.form.steps.second}
          description={locale.task.form.steps.constraints}
          icon={
            getErrorsStep(1) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(1) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(1) ? 'red' : undefined}
        />
        <Stepper.Step
          label={locale.task.form.steps.third}
          description={locale.task.form.steps.description}
          icon={
            getErrorsStep(2) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(2) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(2) ? 'red' : undefined}
        />
        <Stepper.Step
          label={locale.task.form.steps.fourth}
          description={locale.task.form.steps.examples}
          icon={
            getErrorsStep(3) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(3) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(3) ? 'red' : undefined}
        />
        <Stepper.Step
          label={locale.task.form.steps.fifth}
          description={locale.task.form.steps.tests}
          icon={
            getErrorsStep(4) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(4) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(4) ? 'red' : undefined}
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
            disabled={
              currentStep !== LAST_PAGE && getErrorsStep(currentStep)
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
