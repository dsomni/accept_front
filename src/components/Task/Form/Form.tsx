import { useLocale } from '@hooks/useLocale';
import { Button, Group, Stepper } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useState } from 'react';
import styles from '@styles/edu/task.add.module.css';
import Tests from '@components/Task/Form/Tests/Tests';
import Checker from '@components/Task/Form/Checker/Checker';
import Preview from '@components/Task/Form/Preview/Preview';
import MainInfo from '@components/Task/Form/MainInfo/MainInfo';
import DescriptionInfo from '@components/Task/Form/DescriptionInfo/DescriptionInfo';
import Examples from '@components/Task/Form/Examples/Examples';

const Form: FC<{
  form: any;
  handleSubmit: () => void;
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
        className={styles.stepper}
        iconPosition="right"
        active={currentStep}
        onStepClick={setCurrentStep}
        breakpoint={1000}
      >
        <Stepper.Step
          label={capitalize(locale.tasks.form.steps.first.label)}
          description={capitalize(
            locale.tasks.form.steps.first.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tasks.form.steps.second.label)}
          description={capitalize(
            locale.tasks.form.steps.second.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tasks.form.steps.third.label)}
          description={capitalize(
            locale.tasks.form.steps.third.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tasks.form.steps.fourth.label)}
          description={capitalize(
            locale.tasks.form.steps.fourth.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tasks.form.steps.fifth.label)}
          description={capitalize(
            locale.tasks.form.steps.fifth.description
          )}
        />
      </Stepper>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {currentStep === 0 && <MainInfo form={form} />}
        {currentStep === 1 && <DescriptionInfo form={form} />}
        {currentStep === 2 && <Examples form={form} />}
        {currentStep === 3 && form.values.checkType === 'tests' && (
          <Tests form={form} />
        )}
        {currentStep === 3 && form.values.checkType === 'checker' && (
          <Checker form={form} />
        )}
        {currentStep === 4 && <Preview form={form} />}
        <Group position="center" mt="xl" className={styles.buttons}>
          <Button variant="default" onClick={prevStep}>
            {capitalize(locale.form.back)}
          </Button>
          <Button
            onClick={currentStep !== 4 ? nextStep : () => {}}
            type={currentStep !== 4 ? 'button' : 'submit'}
          >
            {currentStep === 4
              ? buttonLabel
              : capitalize(locale.form.next)}
          </Button>
        </Group>
      </form>
    </>
  );
};

export default memo(Form);
