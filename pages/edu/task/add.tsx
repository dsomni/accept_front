import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Button, Group, Stepper } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { capitalize } from '@utils/capitalize';
import { ReactNode, useState } from 'react';
import styles from '@styles/edu/task.add.module.css';
import Tests from '@components/Task/Form/Tests/Tests';
import Checker from '@components/Task/Form/Checker/Checker';
import Preview from '@components/Task/Form/Preview/Preview';
import MainInfo from '@components/Task/Form/MainInfo/MainInfo';
import DescriptionInfo from '@components/Task/Form/DescriptionInfo/DescriptionInfo';
import Examples from '@components/Task/Form/Examples/Examples';

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
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {currentStep === 0 && <MainInfo form={form} />}
        {currentStep === 1 && <DescriptionInfo form={form} />}
        {currentStep === 2 && <Examples form={form} />}
        {currentStep === 3 && form.values.isChecker === 'tests' && (
          <Tests form={form} />
        )}
        {currentStep === 3 && form.values.isChecker === 'checker' && (
          <Checker form={form} />
        )}
        {currentStep === 4 && <Preview form={form} />}
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
