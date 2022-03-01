import { DefaultLayout } from '@layouts/DefaultLayout';
import TaskLayout from '@layouts/TaskLayout';
import { ReactNode } from 'react';
import { ITaskDisplay } from '@custom-types/ITask';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getServerUrl } from '@utils/getServerUrl';
import Description from '@components/Task/Description/Description';
import Send from '@components/Task/Send/Send';
import Results from '@components/Task/Results/Results';

function Task(props: { task: ITaskDisplay }) {
  const task = props.task;
  return (
    <TaskLayout
      description={<Description task={task} />}
      send={<Send spec={task.spec} />}
      results={<Results />}
    />
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
  const task = await fetch(`${SERVER_URL}/api/tasks/task`, {
    method: 'POST',
    body: JSON.stringify({ spec: params.spec }),
  }).then((res) => res.json());
  if (task) {
    return {
      props: {
        task,
      },
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
