import { useLocale } from '@hooks/useLocale';
import { Button, Group, Stepper } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useState } from 'react';
import styles from '@styles/edu/task.add.module.css';
import MainInfo from './MainInfo/MainInfo';
import TaskAdding from './TaskAdding/TaskAdding';
import Preview from './Preview/Preview';

const Form: FC<{
  form: any;
  handleSubmit: () => void;
  buttonLabel: string;
}> = ({ form, handleSubmit, buttonLabel }) => {
  const { locale } = useLocale();
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () =>
    setCurrentStep((current) =>
      current < 3 ? current + 1 : current
    );
  const prevStep = () =>
    setCurrentStep((current) =>
      current > 0 ? current - 1 : current
    );

  return (
    <>
      <Stepper
        className={styles.stepper}
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
      </Stepper>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {currentStep === 0 && <MainInfo form={form} />}
        {currentStep === 1 && (
          <TaskAdding form={form} initialTasks={[]} />
        )}
        {currentStep === 2 && <Preview form={form} />}
        <Group position="center" mt="xl" className={styles.buttons}>
          {currentStep !== 0 && (
            <Button variant="default" onClick={prevStep}>
              {capitalize(locale.form.back)}
            </Button>
          )}
          <Button
            onClick={currentStep !== 2 ? nextStep : () => {}}
            type={currentStep !== 2 ? 'button' : 'submit'}
          >
            {currentStep === 2
              ? buttonLabel
              : capitalize(locale.form.next)}
          </Button>
        </Group>
      </form>
    </>
  );
};

export default memo(Form);
