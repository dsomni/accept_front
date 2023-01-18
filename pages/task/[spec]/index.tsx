import { DefaultLayout } from '@layouts/DefaultLayout';
import TaskLayout from '@layouts/TaskLayout';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ITask, ITaskDisplay } from '@custom-types/data/ITask';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import Sticky, { IStickyAction } from '@ui/Sticky/Sticky';
import DeleteModal from '@components/Task/DeleteModal/DeleteModal';
import { useRouter } from 'next/router';
import { ILanguage } from '@custom-types/data/atomic';
import { useLocale } from '@hooks/useLocale';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { Eye, Notes, Pencil, Trash } from 'tabler-icons-react';
import { useUser } from '@hooks/useUser';
import { STICKY_SIZES } from '@constants/Sizes';
import { useWidth } from '@hooks/useWidth';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { sendRequest } from '@requests/request';
import TasksBar from '@ui/TasksBar/TasksBar';
import Timer from '@ui/Timer/Timer';
import ChatSticky from '@ui/ChatSticky/ChatSticky';
import dynamic from 'next/dynamic';
import Description from '@components/Task/Description/Description';
import Head from 'next/head';

const DynamicSend = dynamic(
  () => import('@components/Task/Send/Send'),
  { ssr: false }
);
const DynamicSendText = dynamic(
  () => import('@components/Task/SendText/SendText'),
  { ssr: false }
);
const DynamicResults = dynamic(
  () => import('@components/Task/Results/Results'),
  { ssr: false }
);

function Task(props: { task: ITask; languages: ILanguage[] }) {
  const task = props.task;
  const languages = props.languages;
  const [activeModal, setActiveModal] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [openedHint, setOpenedHint] = useState(false);
  const [tasks, setTasks] = useState<ITaskDisplay[]>([]);

  const { locale } = useLocale();
  const { isTeacher, isUser, user } = useUser();

  const { width } = useWidth();

  const router = useRouter();

  const type = useMemo(
    () =>
      router.query.assignment
        ? 'assignment'
        : router.query.tournament
        ? 'tournament'
        : 'regular',
    [router.query]
  );
  useEffect(() => {
    console.log(user);
  }, [user]);

  const querySpec = useMemo(
    () => router.query.assignment || router.query.tournament,
    [router.query]
  );

  const fetch_tasks = useCallback(
    (spec: string) => {
      return () =>
        sendRequest<undefined, ITaskDisplay[]>(
          `${type}/tasks_status/${spec}`,
          'GET',
          undefined,
          5000
        ).then((res) => {
          if (!res.error) {
            setTasks(res.response);
          }
        });
    },
    [type]
  );

  useEffect(() => {
    let id: undefined | NodeJS.Timer = undefined;
    if (type !== 'regular' && typeof querySpec == 'string') {
      if (id) {
        clearInterval(id);
      }
      fetch_tasks(querySpec)();
      id = setInterval(fetch_tasks(querySpec), 5000);
    } else {
      setTasks([]);
    }
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [querySpec, type, fetch_tasks]);

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
      color: 'blue',
      href: `/task/tests/${task.spec}`,
      icon: (
        <Notes
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
    },
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
      <Head>
        <meta property="og:title" content={task.title} />
        <meta
          property="og:description"
          content={task.description.replace(/<[^>]*>/g, '')}
        />
        <meta
          property="description"
          content={task.description.replace(/<[^>]*>/g, '')}
        />
      </Head>
      {type !== 'regular' && typeof querySpec === 'string' && (
        <>
          <TasksBar
            currentTask={task.spec}
            tasks={tasks}
            homeHref={`/${type}/${querySpec}`}
            taskQuery={`${type}=${querySpec}`}
          />
          {user && <ChatSticky spec={querySpec} host={user.login} />}
          <Timer url={`${type}/info/${querySpec}`} />
        </>
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
          <div
            dangerouslySetInnerHTML={{ __html: task.hint.content }}
          />
        </SimpleModal>
      )}
      {isUser && !isTeacher && showHint && task.hint && (
        <SingularSticky
          color="var(--accent)"
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
        title={`${locale.titles.task.spec} ${task.title}`}
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
            <DynamicSend
              spec={task.spec}
              setActiveTab={set}
              languages={languages}
            />
          ) : (
            <DynamicSendText
              spec={task.spec}
              testsNumber={task.testsNumber}
              setActiveTab={set}
            />
          ))
        }
        results={(currentTab) =>
          isUser && (
            <DynamicResults activeTab={currentTab} spec={task.spec} />
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
