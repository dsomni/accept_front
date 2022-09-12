import Form from '@components/Notification/Form/Form';
import { IRole } from '@custom-types/data/atomic';
import { IGroup } from '@custom-types/data/IGroup';
import { IUser } from '@custom-types/data/IUser';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { GetStaticProps } from 'next';
import { ReactNode } from 'react';

function NewNotification(props: {
  users: IUser[];
  groups: IGroup[];
  roles: IRole[];
}) {
  return (
    <Form
      users={props.users}
      groups={props.groups}
      roles={props.roles}
    />
  );
}
NewNotification.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default NewNotification;

const API_URL = getApiUrl();

export const getStaticProps: GetStaticProps = async () => {
  const addResponse = await fetch(
    `${API_URL}/api/bundle/notification-add`
  );
  if (addResponse.status === 200) {
    const response = await addResponse.json();
    return {
      props: {
        users: response.users,
        groups: response.groups,
        roles: response.roles,
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
