import Form from '@components/Task/Form/Form';
import { useLocale } from '@hooks/useLocale';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import notificationStyles from '@styles/ui/notification.module.css';
import { useForm } from '@mantine/hooks';
import { ITask, ITaskDisplay } from '@custom-types/ITask';
import { sendRequest } from '@requests/request';
import { useUser } from '@hooks/useUser';
import { ITag } from '@custom-types/ITag';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { getServerUrl } from '@utils/getServerUrl';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';

function EditTask(props: { task: ITask }) {
  const { locale, lang } = useLocale();
  const { user } = useUser();
  const [ready, setReady] = useState(false);
  const task = props.task;

  const [tags, setTags] = useState<ITag[]>([]);
  const [readyTags, setReadyTags] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cleanUp = false;
    setReadyTags(false);
    sendRequest<{}, ITag[]>(`tags/list`, 'GET').then((res) => {
      if (!res.error && !cleanUp) {
        setTags(res.response);
        setReadyTags(true);
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
    [tags, task, readyTags] //eslint-disable-line
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
    const id = newNotification({
      title: capitalize(locale.notify.task.edit.loading),
      message: capitalize(locale.loading) + '...',
    });
    sendRequest<ITask, ITaskDisplay>(
      `tasks/edit/${task.spec}`,
      'POST',
      body
    ).then((res) => {
      if (!res.error) {
        successNotification({
          id,
          title: capitalize(locale.notify.task.edit.success),
          message: res.response.spec,
        });
      } else {
        errorNotification({
          id,
          title: capitalize(locale.notify.task.edit.error),
          message: capitalize(res.detail.description[lang]),
        });
      }
    });
  }, [form.values, user?.login, locale, task?.spec, lang]);
  return (
    <div>
      {ready && readyTags && (
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

const SERVER_URL = getServerUrl();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const task = await fetch(`${SERVER_URL}/api/tasks/task`, {
    method: 'POST',
    body: JSON.stringify({ spec: params.spec }),
  });
  if (task.status === 200) {
    return {
      props: {
        task: await task.json(),
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/Not-Found',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
