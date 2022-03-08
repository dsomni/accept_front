import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/hooks';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useUser } from '@hooks/useUser';
import { Item } from '@components/Task/Form/TagSelector/CustomTransferList/CustomTransferList';
import { sendRequest } from '@requests/request';
import Notify from '@components/Notify/Notify';
import { ITask, ITaskDisplay } from '@custom-types/ITask';
import Form from '@components/Task/Form/Form';
import styles from '@styles/edu/task.add.module.css';
import { capitalize } from '@utils/capitalize';

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
};

function AddTask() {
  const { locale } = useLocale();
  const { user } = useUser();

  const defaultStatuses = useMemo(
    () => ({
      error: locale.tasks.errors.create.error,
      ok: locale.tasks.errors.create.success,
    }),
    [locale]
  );

  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(
    defaultStatuses.ok
  );
  const [notificationDescription, setNotificationDescription] =
    useState('');

  const form = useForm({
    initialValues,
    validationRules: {},
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
    // console.log(body);
    sendRequest<ITask, ITaskDisplay>('tasks/add', 'POST', body).then(
      (res) => {
        console.log(res);
        setAnswer(true);
        if (res) {
          setNotificationStatus(defaultStatuses.ok);
          setNotificationDescription(res.spec);
          setError(false);
        } else {
          setNotificationStatus(defaultStatuses.error);
          setNotificationDescription('');
          setError(true);
        }
      }
    );
  }, [form.values, user?.login, defaultStatuses]);

  return (
    <>
      <div className={styles.notification}>
        <Notify
          answer={answer}
          error={error}
          setAnswer={setAnswer}
          status={notificationStatus}
          description={notificationDescription}
        />
      </div>
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
