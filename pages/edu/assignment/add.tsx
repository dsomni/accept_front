import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/hooks';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useUser } from '@hooks/useUser';
import { sendRequest } from '@requests/request';
import Notify from '@components/Notify/Notify';
import Form from '@components/AssignmentSchema/Form/Form';
import styles from '@styles/edu/task.add.module.css';
import { capitalize } from '@utils/capitalize';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import { Item } from '@components/CustomTransferList/CustomTransferList';

const initialValues = {
  spec: '',
  title: 'Уроки французского',
  author: '',
  description: 'Хороший урок, мне нравится',
  tasks: [
    {
      label: 'Простые числа',
      value: '1f2348d8-9a6e-4760-afdc-9c7c8e792f88',
    },
    {
      label: 'Название Задачи',
      value: '3b3bdfd7-8972-4bba-947e-4db53aea044a',
    },

    {
      label: 'Простые числа 2',
      value: 'a8eacb59-8b8c-4758-b774-d656f1e39834',
    },
  ],
  defaultDuration: 0, // minutes
};

function AddAssignmentSchema() {
  const { locale } = useLocale();
  const { user } = useUser();

  const defaultStatuses = useMemo(
    () => ({
      error: locale.assignmentSchema.errors.create.error,
      ok: locale.assignmentSchema.errors.create.success,
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
      tasks: form.values['tasks'].map((task: Item) => task.value),
      author: user?.login || '',
      duration: form.values.defaultDuration * 60 * 1000, // from minutes to millis
    };
    sendRequest<IAssignmentSchema, IAssignmentSchema>(
      'assignments/schema/add',
      'POST',
      body
    ).then((res) => {
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
    });
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

AddAssignmentSchema.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddAssignmentSchema;
