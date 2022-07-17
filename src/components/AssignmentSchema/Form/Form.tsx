import { useLocale } from '@hooks/useLocale';
import { Button, Group, Stepper } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useState } from 'react';
import stepperStyles from '@styles/ui/stepper.module.css';
import MainInfo from './MainInfo/MainInfo';
import TaskAdding from './TaskAdding/TaskAdding';
import Preview from './Preview/Preview';
import { TaskOrdering } from './TaskOrdering/TaskOrdering';
import { pureCallback } from '@custom-types/ui/atomic';

const Form: FC<{
  form: any;
  handleSubmit: pureCallback<void>;
  buttonLabel: string;
}> = ({ form, handleSubmit, buttonLabel }) => {
  const { locale } = useLocale();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((current) =>
      current < 4 ? current + 1 : current
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
          label={capitalize(
            locale.assignmentSchema.form.steps.first.label
          )}
          description={capitalize(
            locale.assignmentSchema.form.steps.first.description
          )}
        />
        <Stepper.Step
          label={capitalize(
            locale.assignmentSchema.form.steps.second.label
          )}
          description={capitalize(
            locale.assignmentSchema.form.steps.second.description
          )}
        />
        <Stepper.Step
          label={capitalize(
            locale.assignmentSchema.form.steps.third.label
          )}
          description={capitalize(
            locale.assignmentSchema.form.steps.third.description
          )}
        />
        <Stepper.Step
          label={capitalize(
            locale.assignmentSchema.form.steps.fourth.label
          )}
          description={capitalize(
            locale.assignmentSchema.form.steps.fourth.description
          )}
        />
      </Stepper>
      <div>
        {currentStep === 0 && <MainInfo form={form} />}
        {currentStep === 1 && (
          <TaskAdding form={form} initialTasks={form.values.tasks} />
        )}
        {currentStep === 2 && <TaskOrdering form={form} />}
        {currentStep === 3 && <Preview form={form} />}
        <Group
          position="center"
          mt="xl"
          className={stepperStyles.buttons}
        >
          {currentStep !== 0 && (
            <Button variant="default" onClick={prevStep}>
              {capitalize(locale.form.back)}
            </Button>
          )}
          <Button
            onClick={
              currentStep !== 3
                ? nextStep
                : form.onSubmit(handleSubmit)
            }
            type={currentStep === 3 ? 'submit' : 'button'}
          >
            {currentStep === 3
              ? buttonLabel
              : capitalize(locale.form.next)}
          </Button>
        </Group>
      </div>
    </>
  );
};

export default memo(Form);
