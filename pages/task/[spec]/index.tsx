import { DefaultLayout } from '@layouts/DefaultLayout';
import TaskLayout from '@layouts/TaskLayout';
import { ReactNode, useEffect, useState, useCallback } from 'react';
import { ITask } from '@custom-types/data/ITask';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getServerUrl } from '@utils/getServerUrl';
import Description from '@components/Task/Description/Description';
import Send from '@components/Task/Send/Send';
import Results from '@components/Task/Results/Results';
import Sticky from '@ui/Sticky/Sticky';
import DeleteModal from '@components/Task/DeleteModal/DeleteModal';
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
import SingularSticky from '@components/ui/Sticky/SingularSticky';
import { Eye, Pencil, Trash } from 'tabler-icons-react';
import { useUser } from '@hooks/useUser';
import { STICKY_SIZES } from '@constants/Sizes';
import { useWidth } from '@hooks/useWidth';
import SimpleModal from '@components/ui/SimpleModal/SimpleModal';
import { ITableColumn } from '@custom-types/ui/ITable';

function Task(props: { task: ITask; languages: ILanguage[] }) {
  const task = props.task;
  const [activeModal, setActiveModal] = useState(false);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [openedHint, setOpenedHint] = useState(false);

  const { locale, lang } = useLocale();
  const { isTeacher, isUser } = useUser();
  const { width } = useWidth();

  const router = useRouter();

  const onHintClose = useCallback(() => setOpenedHint(false), []);

  useEffect(() => {
    const id = setInterval(() => {
      sendRequest<{}, IAttemptDisplay[]>(
        `task/attempts/${task.spec}`,
        'GET'
      ).then((res) => {
        if (!res.error) {
          setAttempts(
            res.response
              .map((item) => ({
                ...item,
                result: {
                  display: (
                    <div
                      style={{
                        color:
                          item.status.spec == 2
                            ? item.verdict.verdict.spec == 0
                              ? 'var(--positive)'
                              : 'var(--negative)'
                            : 'black',
                      }}
                    >
                      {item.status.spec == 2
                        ? item.verdict.verdict.shortText +
                          ' #' +
                          (item.verdict.test + 1).toString()
                        : capitalize(
                            locale.attempts.statuses[item.status.spec]
                          )}
                    </div>
                  ),
                  value:
                    item.status.spec == 2
                      ? item.verdict.verdict.spec
                      : item.status.spec - 10,
                },
                date: {
                  display: (
                    <>{new Date(item.date).toLocaleString()}</>
                  ),
                  value: new Date(item.date).getTime(),
                },
                language: {
                  display: <>{item.language.name}</>,
                  value: item.language,
                },
              }))
              .sort(
                (a, b) =>
                  new Date(b.date.value).getTime() -
                  new Date(a.date.value).getTime()
              )
          );
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
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, [task.spec, locale, lang]);

  useEffect(() => {
    const by_attempts = !!(
      task.hint &&
      task.hint.alarmType.spec == 0 &&
      attempts.length >= task.hint.alarm
    );
    const first_attempt_date =
      attempts.length > 0
        ? Date.now() - new Date(attempts[0].date).getTime()
        : 0;
    const by_timestamp = !!(
      task.hint &&
      task.hint.alarmType.spec == 1 &&
      first_attempt_date >= task.hint.alarm
    );
    setShowHint(by_attempts || by_timestamp);
  }, [attempts, task.hint]);

  const actions = [
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
    {
      color: 'green',
      icon: (
        <Pencil
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      onClick: () => router.push(`/task/edit/${task.spec}`),
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
  ];

  return (
    <>
      <DeleteModal
        active={activeModal}
        setActive={setActiveModal}
        task={task}
      />
      {task.hint && (
        <SimpleModal
          title={capitalize(locale.tasks.form.hint.title)}
          opened={openedHint}
          close={onHintClose}
        >
          {task.hint.content}
        </SimpleModal>
      )}
      {isUser && !isTeacher && showHint && (
        <SingularSticky
          icon={
            <Eye
              width={STICKY_SIZES[width] / 3}
              height={STICKY_SIZES[width] / 3}
            />
          }
          color={'grape'}
          onClick={() => setOpenedHint(true)}
        />
      )}
      {isTeacher && <Sticky actions={actions} color={'--prime'} />}
      <TaskLayout
        description={<Description task={task} />}
        send={<Send spec={task.spec} />}
        results={
          attempts.length > 0 ? (
            <Results key={attempts.length} attempts={attempts} />
          ) : undefined
        }
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
