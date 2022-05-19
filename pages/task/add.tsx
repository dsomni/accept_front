import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { ReactNode, useCallback } from 'react';
import { useUser } from '@hooks/useUser';
import { ITaskDisplay } from '@custom-types/data/ITask';
import Form from '@components/Task/Form/Form';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { requestWithNotify } from '@utils/requestWithNotify';

const initialValues = {
  spec: '',
  title: 'Простые числа',
  author: '',
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
  hasHint: true,
  hintContent: '',
  hintAlarmType: 'attempts',
  hintAlarm: 0,
  remark: '',
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
  checkerCode: '',
  checkerLang: 'py',
  checkType: 'tests', //"tests" or "checker"
  type: 'code', //"code" or "text"
  isTournament: false,
};

function AddTask() {
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const form = useForm({
    initialValues,
  });

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      tags: form.values['tags'].map((tag: Item) => tag.value),
      author: user?.login || '',
    };
    if (form.values['checkType'] === 'checker') {
      body.checker = {
        sourceCode: form.values['checkerCode'],
        language: form.values['checkerLang'],
        version: 0,
      };
    }
    if (form.values['remark'].trim() === '') {
      body.remark = undefined;
    }
    if (form.values['hasHint']) {
      body.hint = {
        content: form.values['hintContent'],
        alarmType: form.values['hintAlarmType'],
        alarm: form.values['hintAlarm'],
      };
    }
    requestWithNotify(
      'tasks/add',
      'POST',
      locale.notify.task.create,
      lang,
      (response: ITaskDisplay) => response.spec,
      body
    );
  }, [form.values, locale, user?.login, lang]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={capitalize(locale.form.create)}
      />
    </>
  );
}

AddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTask;
