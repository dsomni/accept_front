import Notify from '@components/Notify/Notify';
import { useLocale } from '@hooks/useLocale';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from '@styles/edu/task.edit.module.css';
import { useForm } from '@mantine/hooks';
import { ITaskDisplay } from '@custom-types/ITask';
import { sendRequest } from '@requests/request';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { capitalize } from '@utils/capitalize';
import { Item } from '@components/CustomTransferList/CustomTransferList';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import Form from '@components/AssignmentSchema/Form/Form';

function EditAssignmentSchema() {
  const { locale } = useLocale();
  const { user } = useUser();
  const [ready, setReady] = useState(false);

  const defaultStatuses = useMemo(
    () => ({
      error: locale.assignmentSchema.errors.edit.error,
      ok: locale.assignmentSchema.errors.edit.success,
    }),
    [locale]
  );

  const [assignmentSchema, setAssignmentSchema] =
    useState<IAssignmentSchema>(null!);
  const [tasks, setTasks] = useState<Map<string, ITaskDisplay>>(
    new Map()
  );
  const router = useRouter();

  useEffect(() => {
    let cleanUp = false;
    if (typeof router.query.spec === 'string') {
      sendRequest<{ spec: string }, IAssignmentSchema>(
        `assignments/schema/${router.query.spec}`,
        'GET'
      ).then((res) => {
        if (res) {
          setAssignmentSchema(res);
        }
      });
    }
    sendRequest<{}, ITaskDisplay[]>(`tasks/list`, 'GET').then(
      (res) => {
        if (res) {
          const tasks = new Map<string, ITaskDisplay>();
          for (let i = 0; i < res.length; i++) {
            tasks.set(res[i].spec, res[i]);
          }
          setTasks(tasks);
        }
      }
    );
    return () => {
      cleanUp = true;
    };
  }, [router.query.spec]);

  const formValues = useMemo(
    () => ({
      ...assignmentSchema,
      tasks: assignmentSchema?.tasks
        .map((spec) => tasks.get(spec) || null!)
        .map((task: ITaskDisplay) => ({
          label: task?.title,
          value: task?.spec,
        })),
    }),
    [tasks, assignmentSchema]
  );
  const form = useForm({
    initialValues: formValues,
    validationRules: {},
  });

  useEffect(() => {
    form.setValues(formValues);
    if (assignmentSchema) {
      setReady(true);
    }
  }, [formValues]); // eslint-disable-line

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      tasks: form.values['tasks'].map((task: Item) => task.value),
    };
    sendRequest<IAssignmentSchema, IAssignmentSchema>(
      `assignments/schema/edit/${assignmentSchema.spec}`,
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
  }, [form.values, defaultStatuses, assignmentSchema?.spec]);

  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(
    defaultStatuses.ok
  );
  const [notificationDescription, setNotificationDescription] =
    useState('');
  return (
    <div>
      <div className={styles.notification}>
        <Notify
          answer={answer}
          error={error}
          setAnswer={setAnswer}
          status={notificationStatus}
          description={notificationDescription}
        />
      </div>
      {ready && (
        <Form
          form={form}
          handleSubmit={handleSubmit}
          buttonLabel={capitalize(locale.form.update)}
        />
      )}
    </div>
  );
}

EditAssignmentSchema.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditAssignmentSchema;
