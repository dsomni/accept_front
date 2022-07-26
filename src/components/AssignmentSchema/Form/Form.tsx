import { useLocale } from '@hooks/useLocale';
import { Button, Group, Stepper } from '@mantine/core';
import { FC, memo, useCallback, useState } from 'react';
import stepperStyles from '@styles/ui/stepper.module.css';
import MainInfo from './MainInfo/MainInfo';
import TaskAdding from './TaskAdding/TaskAdding';
import Preview from './Preview/Preview';
import { TaskOrdering } from './TaskOrdering/TaskOrdering';
import { pureCallback } from '@custom-types/ui/atomic';
import { AlertCircle } from 'tabler-icons-react';

const LAST_PAGE = 3;

const stepFields = [
  ['title', 'description', 'tags', 'defaultDuration'],
  ['tasks'],
  [],
];

const Form: FC<{
  form: any;
  handleSubmit: pureCallback<void>;
  buttonLabel: string;
}> = ({ form, handleSubmit, buttonLabel }) => {
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
          label={locale.assignmentSchema.form.steps.first.label}
          description={
            locale.assignmentSchema.form.steps.first.description
          }
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
          label={locale.assignmentSchema.form.steps.second.label}
          description={
            locale.assignmentSchema.form.steps.second.description
          }
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
          label={locale.assignmentSchema.form.steps.third.label}
          description={
            locale.assignmentSchema.form.steps.third.description
          }
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
          label={locale.assignmentSchema.form.steps.fourth.label}
          description={
            locale.assignmentSchema.form.steps.fourth.description
          }
        />
      </Stepper>
      <div>
        {currentStep === 0 && <MainInfo form={form} />}
        {currentStep === 1 && (
          <TaskAdding form={form} initialTasks={form.values.tasks} />
        )}
        {currentStep === 2 && <TaskOrdering form={form} />}
        {currentStep === LAST_PAGE && <Preview form={form} />}
        <Group
          position="center"
          mt="xl"
          className={stepperStyles.buttons}
        >
          {currentStep !== 0 && (
            <Button variant="default" onClick={prevStep}>
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
            type={currentStep === LAST_PAGE ? 'submit' : 'button'}
          >
            {currentStep === LAST_PAGE
              ? buttonLabel
              : locale.form.next}
          </Button>
        </Group>
      </div>
    </>
  );
};

export default memo(Form);
