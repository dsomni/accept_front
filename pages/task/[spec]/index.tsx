import { DefaultLayout } from '@layouts/DefaultLayout';
import TaskLayout from '@layouts/TaskLayout';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ITask, ITaskDisplay } from '@custom-types/data/ITask';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import Description from '@components/Task/Description/Description';
import Send from '@components/Task/Send/Send';
import Results from '@components/Task/Results/Results';
import Sticky, { IStickyAction } from '@ui/Sticky/Sticky';
import DeleteModal from '@components/Task/DeleteModal/DeleteModal';
import { useRouter } from 'next/router';
import { ILanguage } from '@custom-types/data/atomic';
import { useLocale } from '@hooks/useLocale';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { Eye, Pencil, Trash } from 'tabler-icons-react';
import { useUser } from '@hooks/useUser';
import { STICKY_SIZES } from '@constants/Sizes';
import { useWidth } from '@hooks/useWidth';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { sendRequest } from '@requests/request';
import TasksBar from '@ui/TasksBar/TasksBar';
import SendText from '@components/Task/SendText/SendText';
import ChatSticky from '@ui/ChatSticky/ChatSticky';

function Task(props: { task: ITask; languages: ILanguage[] }) {
  const task = props.task;
  const languages = props.languages;
  const [activeModal, setActiveModal] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [openedHint, setOpenedHint] = useState(false);
  const [tasks, setTasks] = useState<ITaskDisplay[]>([]);

  const { locale } = useLocale();
  const { isTeacher, isUser } = useUser();
  const { width } = useWidth();

  const router = useRouter();

  const fetch_tasks_assignment = useCallback((spec: string) => {
    return () =>
      sendRequest<undefined, ITaskDisplay[]>(
        `assignment/tasks/${spec}`,
        'GET',
        undefined,
        1000
      ).then((res) => {
        if (!res.error) {
          setTasks(res.response);
        }
      });
  }, []);

  useEffect(() => {
    let id: undefined | NodeJS.Timer = undefined;
    if (
      router.query.assignment &&
      typeof router.query.assignment === 'string'
    ) {
      if (id) {
        clearInterval(id);
      }
      fetch_tasks_assignment(router.query.assignment)();
      id = setInterval(
        fetch_tasks_assignment(router.query.assignment),
        10000
      );
    } else {
      setTasks([]);
    }
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [router.query.assignment, fetch_tasks_assignment]);

  const actions: IStickyAction[] = (
    task.hint
      ? ([
          {
            color: 'grape',
            icon: (
              <Eye
                width={STICKY_SIZES[width] / 3}
                height={STICKY_SIZES[width] / 3}
              />
            ),
            onClick: () => setOpenedHint(true),
          },
        ] as IStickyAction[])
      : []
  ).concat([
    {
      color: 'green',
      href: `/task/edit/${task.spec}`,
      icon: (
        <Pencil
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
    },
    {
      color: 'red',
      icon: (
        <Trash
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      onClick: () => setActiveModal(true),
    },
  ]);

  return (
    <>
      {typeof router.query.assignment === 'string' && (
        <TasksBar
          tasks={tasks}
          assignment={router.query.assignment}
        />
      )}
      {typeof router.query.assignment === 'string' && (
        <ChatSticky spec={router.query.assignment} />
      )}
      <DeleteModal
        active={activeModal}
        setActive={setActiveModal}
        task={task}
      />
      {task.hint && (
        <SimpleModal
          title={locale.task.form.hint.title}
          opened={openedHint}
          close={() => setOpenedHint(false)}
        >
          {task.hint.content}
        </SimpleModal>
      )}
      {isUser && !isTeacher && showHint && task.hint && (
        <SingularSticky
          icon={
            <Eye
              width={STICKY_SIZES[width] / 3}
              height={STICKY_SIZES[width] / 3}
            />
          }
          onClick={() => setOpenedHint(true)}
        />
      )}
      {isTeacher && <Sticky actions={actions} />}
      <TaskLayout
        title={task.title}
        description={
          <Description
            task={task}
            setShowHint={setShowHint}
            languagesRestrictions={
              task.allowedLanguages.length > 0 ||
              task.forbiddenLanguages.length > 0
            }
          />
        }
        send={(set) =>
          isUser &&
          (task.taskType.spec == 0 ? (
            <Send
              spec={task.spec}
              setActiveTab={set}
              languages={languages}
            />
          ) : (
            <SendText
              spec={task.spec}
              testsNumber={task.testsNumber}
              setActiveTab={set}
            />
          ))
        }
        results={(currentTab) =>
          isUser && (
            <Results activeTab={currentTab} spec={task.spec} />
          )
        }
      />
    </>
  );
}

Task.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Task;

const API_URL = getApiUrl();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const response = await fetch(
    `${API_URL}/api/bundle/task-page/${params.spec}`
  );
  if (response.status === 200) {
    const response_json = await response.json();
    return {
      props: {
        task: response_json.task,
        languages: response_json.languages,
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
