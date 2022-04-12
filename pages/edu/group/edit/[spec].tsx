import Notify from '@ui/Notify/Notify';
import Form from '@components/Group/Form/Form';
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
import { sendRequest } from '@requests/request';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { capitalize } from '@utils/capitalize';
import { getServerUrl } from '@utils/getServerUrl';
import { GetStaticPaths, GetStaticProps } from 'next';
import { IStudentList } from '@custom-types/IStudent';
import { IGroup } from '@custom-types/IGroup';

function EditGroup(props: { group: IGroup }) {
  const { locale } = useLocale();
  const { user } = useUser();
  const [ready, setReady] = useState(false);
  const group = props.group;

  const defaultStatuses = useMemo(
    () => ({
      error: locale.groups.errors.edit.error,
      ok: locale.groups.errors.edit.success,
    }),
    [locale]
  );

  const [students, setStudents] = useState<IStudentList[]>([]);
  const [readyStudents, setReadyStudents] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cleanUp = false;
    setReadyStudents(false);
    sendRequest<{}, IStudentList[]>(`students/list`, 'GET').then(
      (res) => {
        if (res && !cleanUp) {
          setStudents(res);
          setReadyStudents(true);
        }
      }
    );
    return () => {
      cleanUp = true;
    };
  }, [router.query.spec]);

  const formValues = useMemo(
    () => ({
      ...group,
      members: group.members
        .map(
          (login) =>
            students.find((item) => item.login === login) || undefined
        )
        .filter((item) => item),
    }),
    [students, group, readyStudents] //eslint-disable-line
  );
  const form = useForm({
    initialValues: formValues,
    validationRules: {},
  });

  useEffect(() => {
    form.setValues(formValues);
    if (group) {
      setReady(true);
    }
  }, [formValues]); // eslint-disable-line

  const handleSubmit = useCallback(() => {
    sendRequest<IGroup, IGroup>(`groups/edit/${group.spec}`, 'POST', {
      ...form.values,
      members: form.values['members'].map(
        (member: any) => member.login
      ),
    }).then((res) => {
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
  }, [form.values, defaultStatuses, group?.spec]);

  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(
    defaultStatuses.ok
  );
  const [notificationDescription, setNotificationDescription] =
    useState('');
  return (
    <div>
      <div className={notificationStyles.notification}>
        <Notify
          answer={answer}
          error={error}
          setAnswer={setAnswer}
          status={notificationStatus}
          description={notificationDescription}
        />
      </div>
      {ready && readyStudents && (
        <Form
          form={form}
          handleSubmit={handleSubmit}
          buttonText={capitalize(locale.edit)}
        />
      )}
    </div>
  );
}

EditGroup.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditGroup;

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
  const group = await fetch(`${SERVER_URL}/api/groups/group`, {
    method: 'POST',
    body: JSON.stringify({ spec: params.spec }),
  });
  if (group.status === 200) {
    return {
      props: {
        group: await group.json(),
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
