import { DefaultLayout } from '@layouts/DefaultLayout';
import TaskLayout from '@layouts/TaskLayout';
import { ReactNode, useEffect, useState } from 'react';
import { ITask } from '@custom-types/data/ITask';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getServerUrl } from '@utils/getServerUrl';
import Description from '@components/Task/Description/Description';
import Send from '@components/Task/Send/Send';
import Results from '@components/Task/Results/Results';
import Sticky from '@ui/Sticky/Sticky';
import DeleteModal from '@components/Task/DeleteModal/DeleteModal';
import { Pencil1Icon, TrashIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { ILanguage } from '@custom-types/data/atomic';
import { sendRequest } from '@requests/request';
import { IAttemptDisplay } from '@custom-types/data/IAttempt';
import {
  newNotification,
  errorNotification,
} from '@utils/notificationFunctions';
import { capitalize } from '@utils/capitalize';
import { useLocale } from '@hooks/useLocale';

function Task(props: { task: ITask; languages: ILanguage[] }) {
  const task = props.task;
  const [activeModal, setActiveModal] = useState(false);
  const [attempts, setAttempts] = useState<IAttemptDisplay[]>([]);
  const { locale, lang } = useLocale();

  const router = useRouter();

  useEffect(() => {
    sendRequest<{}, IAttemptDisplay[]>(
      `task/attempts/${task.spec}`,
      'GET'
    ).then((res) => {
      if (!res.error) {
        setAttempts(res.response);
      } else {
        const id = newNotification({});
        errorNotification({
          id,
          title: capitalize(locale.notify.task.attempts.list.error),
          message: res.detail.description[lang],
          autoClose: 5000,
        });
      }
    });
  }, [task.spec, locale, lang]);

  const actions = [
    {
      color: 'green',
      icon: <Pencil1Icon height={20} width={20} />,
      onClick: () => router.push(`/task/edit/${task.spec}`),
    },
    {
      color: 'red',
      icon: <TrashIcon height={20} width={20} />,
      onClick: () => setActiveModal(true),
    },
  ];
  return (
    <>
      <DeleteModal
        active={activeModal}
        setActive={setActiveModal}
        task={task}
      />
      <Sticky actions={actions} color={'--prime'} />
      <TaskLayout
        description={<Description task={task} />}
        send={<Send spec={task.spec} />}
        results={<Results />}
      />
    </>
  );
}

Task.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Task;

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
  const task = await fetch(`${SERVER_URL}/api/task/${params.spec}`);
  if (task.status === 200) {
    return {
      props: {
        task: await task.json(),
      },
      revalidate: 10 * 60,
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
