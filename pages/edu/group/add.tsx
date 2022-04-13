import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/hooks';
import { ReactNode, useCallback } from 'react';
import { useUser } from '@hooks/useUser';
import { sendRequest } from '@requests/request';
import notificationStyles from '@styles/ui/notification.module.css';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IGroup, IGroupToCreate } from '@custom-types/IGroup';
import Form from '@components/Group/Form/Form';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';

const initialValues = {
  title: 'title',
  members: [],
};

function AddGroup() {
  const { locale } = useLocale();

  const form = useForm({
    initialValues,
    validationRules: {},
  });

  const handleSubmit = useCallback(() => {
    newNotification({
      id: 'creating-group',
      title: capitalize(locale.notify.group.create.loading),
      message: capitalize(locale.loading) + '...',
    });
    sendRequest<IGroupToCreate, IGroup>('groups/add', 'POST', {
      spec: '',
      title: form.values['title'],
      members: form.values['members'].map(
        (member: Item) => member.value
      ),
    }).then((res) => {
      if (res) {
        successNotification({
          id: 'creating-group',
          title: capitalize(locale.notify.group.create.success),
          message: res.spec,
        });
      } else {
        errorNotification({
          id: 'creating-group',
          title: capitalize(locale.notify.group.create.error),
          message: capitalize(locale.error),
        });
      }
    });
  }, [form.values, locale]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonText={capitalize(locale.create)}
      />
    </>
  );
}

AddGroup.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddGroup;