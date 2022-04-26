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
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';

function EditGroup(props: { group: IGroup }) {
  const { locale, lang } = useLocale();
  const { user } = useUser();
  const [ready, setReady] = useState(false);
  const group = props.group;

  const [students, setStudents] = useState<IStudentList[]>([]);
  const [readyStudents, setReadyStudents] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cleanUp = false;
    setReadyStudents(false);
    sendRequest<{}, IStudentList[]>(`students/list`, 'GET').then(
      (res) => {
        if (!res.error && !cleanUp) {
          setStudents(res.response);
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
    const id = newNotification({
      title: capitalize(locale.notify.group.edit.loading),
      message: capitalize(locale.loading) + '...',
    });
    sendRequest<IGroup, IGroup>(`groups/edit/${group.spec}`, 'POST', {
      ...form.values,
      members: form.values['members'].map(
        (member: any) => member.login
      ),
    }).then((res) => {
      if (!res.error) {
        successNotification({
          id,
          title: capitalize(locale.notify.group.edit.success),
          message: res.response.spec,
        });
      } else {
        errorNotification({
          id,
          title: capitalize(locale.notify.group.edit.error),
          message: capitalize(res.detail.description[lang]),
        });
      }
    });
  }, [form.values, group?.spec, locale, lang]);

  return (
    <div>
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
