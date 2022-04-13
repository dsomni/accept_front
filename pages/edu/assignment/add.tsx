import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/hooks';
import { ReactNode, useCallback } from 'react';
import { useUser } from '@hooks/useUser';
import { sendRequest } from '@requests/request';
import Form from '@components/AssignmentSchema/Form/Form';
import { capitalize } from '@utils/capitalize';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';

const initialValues = {
  spec: '',
  title: 'Уроки французского',
  author: '',
  description: 'Хороший урок, мне нравится',
  tasks: [],
  tags: [],
  defaultDuration: 0, // minutes
};

function AddAssignmentSchema() {
  const { locale } = useLocale();
  const { user } = useUser();

  const form = useForm({
    initialValues,
    validationRules: {},
  });

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      tasks: form.values['tasks'].map((task: Item) => task.value),
      tags: form.values['tags'].map((tag: Item) => tag.value),
      author: user?.login || '',
      duration: form.values.defaultDuration * 60 * 1000, // from minutes to milliseconds
    };
    const id = newNotification({
      title: capitalize(
        locale.notify.assignmentSchema.create.loading
      ),
      message: capitalize(locale.loading) + '...',
    });
    sendRequest<IAssignmentSchema, IAssignmentSchema>(
      'assignments/schema/add',
      'POST',
      body
    ).then((res) => {
      if (!res.error) {
        successNotification({
          id,
          title: capitalize(
            locale.notify.assignmentSchema.create.success
          ),
          message: res.response.spec,
        });
      } else {
        errorNotification({
          id,
          title: capitalize(
            locale.notify.assignmentSchema.create.error
          ),
          message: capitalize(res.detail.description),
        });
      }
    });
  }, [form.values, user?.login, locale]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={capitalize(locale.form.create)}
      />
    </>
  );
}

AddAssignmentSchema.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddAssignmentSchema;
