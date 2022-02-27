import TaskMainInfo from '@components/Task/Add/TaskMainInfo';
import TaskExamples from '@components/Task/Add/TaskExamples';
import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Button, Group, Stepper } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { capitalize } from '@utils/capitalize';
import { ReactNode, useState } from 'react';
import styles from '@styles/edu/task.add.module.css';
import TaskTests from '@components/Task/Add/TaskTests';
import TaskChecker from '@components/Task/Add/TaskChecker';
import TaskPreview from '@components/Task/Add/TaskPreview';
import TaskDescriptionInfo from '@components/Task/Add/TaskDescriptionInfo/TaskDescriptionInfo';

function AddTask() {
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

  const form = useForm({
    initialValues: {
      spec: '',
      title: '123',
      author: '',
      tags: [],
      verdict: undefined,
      description:
        '<p><strong>12312312321312</strong><br><u>dsfsd</u></p><p>&nbsp;</p><p>&nbsp;</p><p>5<sup>6</sup> &nbsp; &nbsp;&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><mark class="marker-yellow">123</mark></p>',
      inputFormat: '',
      outputFormat: '',
      grade: 0,
      examples: [['', '']],
      tests: [['', '']],
      checker: '',
      isChecker: 'checker', //"tests or checker"
      type: 'code', //"code"=true or "text"
    },
    validationRules: {},
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
          label={capitalize(locale.tasks.add.steps.first.label)}
          description={capitalize(
            locale.tasks.add.steps.first.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tasks.add.steps.second.label)}
          description={capitalize(
            locale.tasks.add.steps.second.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tasks.add.steps.third.label)}
          description={capitalize(
            locale.tasks.add.steps.third.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tasks.add.steps.fourth.label)}
          description={capitalize(
            locale.tasks.add.steps.fourth.description
          )}
        />
        <Stepper.Step
          label={capitalize(locale.tasks.add.steps.fifth.label)}
          description={capitalize(
            locale.tasks.add.steps.fifth.description
          )}
        />
      </Stepper>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {currentStep === 0 && <TaskMainInfo form={form} />}
        {currentStep === 1 && <TaskDescriptionInfo form={form} />}
        {currentStep === 2 && <TaskExamples form={form} />}
        {currentStep === 3 && form.values.isChecker === 'tests' && (
          <TaskTests form={form} />
        )}
        {currentStep === 3 && form.values.isChecker === 'checker' && (
          <TaskChecker form={form} />
        )}
        {currentStep === 4 && <TaskPreview form={form} />}
      </form>
      <Group position="center" mt="xl" className={styles.buttons}>
        <Button variant="default" onClick={prevStep}>
          {capitalize(locale.form.back)}
        </Button>
        <Button onClick={nextStep}>
          {currentStep === 4
            ? capitalize(locale.form.create)
            : capitalize(locale.form.next)}
        </Button>
      </Group>
    </>
  );
}

AddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTask;
