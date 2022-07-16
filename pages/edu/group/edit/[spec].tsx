import Form from '@components/Group/Form/Form';
import { useLocale } from '@hooks/useLocale';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from '@mantine/form';
import { sendRequest } from '@requests/request';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';

import { getServerUrl } from '@utils/getServerUrl';
import { GetStaticPaths, GetStaticProps } from 'next';
import { IStudentList } from '@custom-types/data/IStudent';
import { IGroup } from '@custom-types/data/IGroup';
import { requestWithNotify } from '@utils/requestWithNotify';

function EditGroup(props: { group: IGroup }) {
  const { locale, lang } = useLocale();
  const [ready, setReady] = useState(false);
  const group = props.group;

  const [students, setStudents] = useState<IStudentList[]>([]);
  const [readyStudents, setReadyStudents] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let cleanUp = false;
    setReadyStudents(false);
    sendRequest<{}, IStudentList[]>(
      `students/list`,
      'GET',
      undefined,
      600000
    ).then((res) => {
      if (!res.error && !cleanUp) {
        setStudents(res.response);
        setReadyStudents(true);
      }
    });
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
  });

  useEffect(() => {
    form.setValues(formValues);
    if (group) {
      setReady(true);
    }
  }, [formValues]); // eslint-disable-line

  const handleSubmit = useCallback(() => {
    const body = {
      ...form.values,
      members: form.values['members'].map(
        (member: any) => member.login
      ),
    };
    requestWithNotify(
      `groups/edit/${group.spec}`,
      'POST',
      locale.notify.group.edit,
      lang,
      (response: IGroup) => response.spec,
      body
    );
  }, [form.values, group?.spec, locale, lang]);

  return (
    <div>
      {ready && readyStudents && (
        <Form
          form={form}
          handleSubmit={handleSubmit}
          buttonText={locale.edit}
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
