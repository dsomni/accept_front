import { DefaultLayout } from '@layouts/DefaultLayout';
import TaskLayout from '@layouts/TaskLayout';
import { ReactNode, useState } from 'react';
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

function Task(props: { task: ITask }) {
  const task = props.task;
  const [activeModal, setActiveModal] = useState(false);
  const router = useRouter();

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
  const task = await fetch(`${SERVER_URL}/api/task/${params.spec}`, {
    method: 'POST',
    // body: JSON.stringify({ spec:  }),
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
