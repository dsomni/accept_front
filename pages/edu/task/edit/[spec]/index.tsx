import Notify from '@components/Notify/Notify';
import Form from '@components/Task/Form/Form';
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
import { Item } from '@components/Task/Form/TagSelector/CustomTransferList/CustomTransferList';
import { ITask, ITaskDisplay } from '@custom-types/ITask';
import { sendRequest } from '@requests/request';
import { useUser } from '@hooks/useUser';
import { ITag } from '@custom-types/ITag';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { capitalize } from '@utils/capitalize';

function EditTask() {
  const { locale } = useLocale();
  const { user } = useUser();
  const [ready, setReady] = useState(false);

  const defaultStatuses = useMemo(
    () => ({
      error: locale.tasks.errors.edit.error,
      ok: locale.tasks.errors.edit.success,
    }),
    [locale]
  );

  const [task, setTask] = useState<ITask>(null!);
  const [tags, setTags] = useState<ITag[]>([]);
  const router = useRouter();

  useEffect(() => {
    let cleanUp = false;
    if (typeof router.query.spec === 'string') {
      sendRequest<{ spec: string }, ITask>(
        `tasks/task-full`,
        'POST',
        {
          spec: router.query.spec,
        }
      ).then((res) => {
        if (res) {
          setTask(res);
        }
      });
    }
    sendRequest<{}, ITag[]>(`tags/list`, 'GET').then((res) => {
      if (res) {
        setTags(res);
      }
    });
    return () => {
      cleanUp = true;
    };
  }, [router.query.spec]);

  const formValues = useMemo(
    () => ({
      ...task,
      checkerCode: task?.checker?.sourceCode,
      checkerLang: task?.checker?.language,
      hasHint: task?.hint ? true : false,
      hintContent: task?.hint?.content,
      hintAlarmType: task?.hint?.alarmType,
      hintAlarm: task?.hint?.alarm,
      tags: tags
        .filter((tag: ITag) => task?.tags.includes(tag.spec))
        .map((tag: ITag) => ({ label: tag.title, value: tag.spec })),
    }),
    [tags, task]
  );
  const form = useForm({
    initialValues: formValues,
    validationRules: {},
  });

  useEffect(() => {
    form.setValues(formValues);
    if (task) {
      setReady(true);
    }
  }, [formValues]); // eslint-disable-line

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      tags: form.values['tags'].map((tag: Item) => tag.value),
      author: user?.login || '',
      lastUpdate: new Date().getTime(),
    };
    if (form.values['checkType'] === 'checker') {
      body.checker = {
        sourceCode: form.values['checkerCode'],
        language: form.values['checkerLang'],
        version: 0,
      };
    }
    if (
      form.values['remark'] &&
      form.values['remark'].trim() === ''
    ) {
      body.remark = undefined;
    }
    if (form.values['hasHint']) {
      body.hint = {
        content: form.values['hintContent'],
        alarmType: form.values['hintAlarmType'],
        alarm: form.values['hintAlarm'],
      };
    }
    sendRequest<ITask, ITaskDisplay>(
      `tasks/edit/${task.spec}`,
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
  }, [form.values, user?.login, defaultStatuses, task?.spec]);

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

EditTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditTask;
