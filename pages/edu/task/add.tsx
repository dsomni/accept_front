import TaskMainInfo from '@components/Task/Add/TaskMainInfo';
import TaskTypeInfo from '@components/Task/Add/TaskTypeInfo';
import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Button, Group, Stepper } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { capitalize } from '@utils/capitalize';
import { ReactNode, useState } from 'react';
import styles from './add.module.css';
function AddTask() {
  const { locale } = useLocale();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((current) =>
      current < 3 ? current + 1 : current
    );
  const prevStep = () =>
    setCurrentStep((current) =>
      current > 0 ? current - 1 : current
    );

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      inputFormat: '',
      outputFormat: '',
      grade: 0,
      examples: [['', '']],
      isChecker: false, //"tests or checker"
      type: 'code', //"code" or "text"
    },
  });

  return (
    <>
      <Stepper
        className={styles.stepper}
        iconPosition="right"
        active={currentStep}
        onStepClick={setCurrentStep}
        breakpoint="sm"
      >
        <Stepper.Step
          label={capitalize(locale.pages.tasks.add.steps.first.label)}
          description={capitalize(
            locale.pages.tasks.add.steps.first.description
          )}
        />
        <Stepper.Step
          label={capitalize(
            locale.pages.tasks.add.steps.second.label
          )}
          description={capitalize(
            locale.pages.tasks.add.steps.second.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.pages.tasks.add.steps.third.label)}
          description={capitalize(
            locale.pages.tasks.add.steps.third.description
          )}
        />
        <Stepper.Step
          label={capitalize(
            locale.pages.tasks.add.steps.fourth.label
          )}
          description={capitalize(
            locale.pages.tasks.add.steps.fourth.description
          )}
        />
      </Stepper>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {currentStep == 0 && <TaskMainInfo form={form} />}
        {currentStep == 1 && <TaskTypeInfo form={form} />}
      </form>
      <Group position="center" mt="xl" className={styles.buttons}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}

AddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTask;
