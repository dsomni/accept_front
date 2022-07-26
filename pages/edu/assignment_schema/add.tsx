import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { ReactNode, useCallback } from 'react';
import { useUser } from '@hooks/useUser';
import Form from '@components/AssignmentSchema/Form/Form';

import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { requestWithNotify } from '@utils/requestWithNotify';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

const initialValues = {
  spec: '',
  title: '',
  description: '',
  author: '',
  tasks: [],
  defaultDuration: 40, // minutes
  tags: [],
};

function AddAssignmentSchema() {
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const form = useForm({
    initialValues,
    validate: {
      title: (value) =>
        value.length < 5
          ? locale.assignmentSchema.form.validation.title
          : null,
      description: (value) =>
        value.length < 20
          ? locale.assignmentSchema.form.validation.description
          : null,
      tasks: (value) =>
        value
          ? value.length === 0
            ? locale.assignmentSchema.form.validation.tasks
            : null
          : locale.assignmentSchema.form.validation.tasks,
      defaultDuration: (value) =>
        value <= 5
          ? locale.assignmentSchema.form.validation.defaultDuration
          : null,
    },
  });

  const handleSubmit = useCallback(() => {
    if (form.validate().hasErrors) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.notify.task.validation.error,
        autoClose: 5000,
      });
      return;
    }
    let body: any = {
      ...form.values,
      author: user?.login || '',
      tasks: form.values['tasks'].map((task: Item) => task.value),
      defaultDuration: form.values.defaultDuration * 60 * 1000, // from minutes to milliseconds
      tags: form.values['tags'].map((tag: Item) => tag.value),
    };
    requestWithNotify(
      'assignment_schema/add',
      'POST',
      locale.notify.assignmentSchema.create,
      lang,
      (response: IAssignmentSchema) => response.spec,
      body
    );
  }, [form, user?.login, locale, lang]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={locale.form.create}
      />
    </>
  );
}

AddAssignmentSchema.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddAssignmentSchema;
