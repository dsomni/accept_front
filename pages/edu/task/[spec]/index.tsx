import TaskDescription from '@components/Task/TaskDescription';
import { DefaultLayout } from '@layouts/DefaultLayout';
import TaskLayout from '@layouts/TaskLayout';
import { memo, ReactNode } from 'react';
import { ITaskDisplay } from '@custom-types/ITask';
import TaskSend from '@components/Task/TaskSend';
import TaskResults from '@components/Task/TaskResults';
import { GetStaticPaths, GetStaticProps } from 'next';
import { env } from 'process';

function Task(props: { task: ITaskDisplay }) {
  const task = props.task;
  return (
    <TaskLayout
      description={<TaskDescription task={task} />}
      send={<TaskSend spec={task.spec} />}
      results={<TaskResults />}
    />
  );
}

Task.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Task;

const SERVER_URL =
  env.NODE_ENV === 'production'
    ? 'https://produrl.com'
    : 'http://localhost:8080';

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
  }).then((res) => res.json());
  if (task) {
    return {
      props: {
        task,
      },
      revalidate: 30 * 60,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
