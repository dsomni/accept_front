import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { UseFormReturnType } from '@mantine/form';
import { ReactNode, useCallback } from 'react';
import { getApiUrl } from '@utils/getServerUrl';
import { IGroup } from '@custom-types/data/IGroup';
import Form from '@components/Group/Form/Form';
import { requestWithNotify } from '@utils/requestWithNotify';
import { GetStaticProps } from 'next';
import { IUser } from '@custom-types/data/IUser';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import Title from '@ui/Title/Title';

const initialValues = {
  spec: '',
  name: '',
  readonly: false,
  members: [],
};

function AddGroup(props: { users: IUser[] }) {
  const users = props.users;

  const { locale, lang } = useLocale();

  const handleSubmit = useCallback(
    (form: UseFormReturnType<any>) => {
      if (form.validate().hasErrors) {
        const id = newNotification({});
        errorNotification({
          id,
          title: locale.notify.group.validation.error,
          autoClose: 5000,
        });
        return;
      }
      requestWithNotify<
        { group: IGroup; members: string[] },
        boolean
      >(
        'group/add',
        'POST',
        locale.notify.group.create,
        lang,
        (_: boolean) => '',
        {
          group: {
            spec: form.values.spec,
            name: form.values.name,
            readonly: form.values.readonly,
          },
          members: form.values.members,
        }
      );
    },
    [locale, lang]
  );

  return (
    <>
      <Title title={locale.titles.group.add} />
      <Form
        handleSubmit={handleSubmit}
        buttonText={locale.create}
        initialValues={initialValues}
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

export const getStaticProps: GetStaticProps = async () => {
  const usersResponse = await fetch(`${API_URL}/api/user`, {
    method: 'GET',
  });
  if (usersResponse.status === 200) {
    const users = await usersResponse.json();
    return {
      props: {
        users: users,
      },
      revalidate: 120, //seconds
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/Not-Found',
    },
  };
};
