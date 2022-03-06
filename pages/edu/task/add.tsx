import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Button, Group, Stepper } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { capitalize } from '@utils/capitalize';
import { ReactNode, useCallback, useState } from 'react';
import styles from '@styles/edu/task.add.module.css';
import Tests from '@components/Task/Form/Tests/Tests';
import Checker from '@components/Task/Form/Checker/Checker';
import Preview from '@components/Task/Form/Preview/Preview';
import MainInfo from '@components/Task/Form/MainInfo/MainInfo';
import DescriptionInfo from '@components/Task/Form/DescriptionInfo/DescriptionInfo';
import Examples from '@components/Task/Form/Examples/Examples';
import { useUser } from '@hooks/useUser';
import { Item } from '@components/Task/Form/TagSelector/CustomTransferList/CustomTransferList';

function AddTask() {
  const { locale } = useLocale();
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useUser();

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
      title: 'Простые числа',
      author: user?.login || '',
      tags: [],
      verdict: undefined,
      lastUpdate: 0,
      lastRender: 0,
      description:
        'Написать программу выводящую все простые числа меньше n.',
      inputFormat: 'Вводится натуральное число n<10000. ',
      outputFormat:
        'Выведите все простые числа меньшие n в одну строку через пробел. Если простых нет выведите "NO".',
      grade: 11,
      examples: [
        { inputData: '1', outputData: 'NO' },
        { inputData: '15', outputData: '2 3 5 7 11 13' },
      ],
      tests: [
        { inputData: '1', outputData: '1' },
        { inputData: '1', outputData: '1' },
        { inputData: '1', outputData: '1' },
        { inputData: '1', outputData: '1' },
        { inputData: '1', outputData: '1' },
        { inputData: '1', outputData: '1' },
        { inputData: '1', outputData: '1' },
        { inputData: '1', outputData: '1' },
        { inputData: '1', outputData: '1' },
      ],
      checker: '',
      checkerLang: 'py',
      checkType: 'tests', //"tests" or "checker"
      type: 'code', //"code" or "text"
    },
    validationRules: {},
  });

  const handleSubmit = useCallback(() => {
    console.log(form.values);
    fetch('/api/tasks/add', {
      method: 'POST',
      body: JSON.stringify({
        ...form.values,
        tags: form.values['tags'].map((tag: Item) => tag.value),
        checker: {
          sourceCode: form.values['checker'],
          language: form.values['checkerLang'],
          version: 0,
        },
      }),
    });
  }, [form.values]);

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
              ? capitalize(locale.form.create)
              : capitalize(locale.form.next)}
          </Button>
        </Group>
      </form>
    </>
  );
}

AddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTask;
