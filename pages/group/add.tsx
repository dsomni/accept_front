import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { ReactNode, useCallback } from 'react';
import { getApiUrl } from '@utils/getServerUrl';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IGroup } from '@custom-types/data/IGroup';
import Form from '@components/Group/Form/Form';
import { requestWithNotify } from '@utils/requestWithNotify';
import { GetStaticPaths, GetStaticProps } from 'next';
import { IUser } from '@custom-types/data/IUser';

const initialValues = {
  spec: '',
  title: 'Title',
  members: [],
};

function AddGroup({ props }: { props: { users: IUser[] } }) {
  const users = props.users;

  const { locale, lang } = useLocale();

  const form = useForm({
    initialValues,
  });

  const handleSubmit = useCallback(() => {
    const body = {
      spec: form.values.spec,
      title: form.values['title'],
    };
    requestWithNotify(
      'group/add',
      'POST',
      locale.notify.group.create,
      lang,
      (response: IGroup) => response.spec,
      body
    );
  }, [form.values, locale, lang]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonText={locale.create}
        users={users}
      />
    </>
  );
}

AddGroup.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddGroup;

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
  const users = await fetch(`${API_URL}/api/user`, {
    method: 'GET',
  });
  if (users.status === 200) {
    return {
      props: {
        users: users,
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
