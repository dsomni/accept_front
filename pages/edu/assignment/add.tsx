import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { ReactNode, useCallback } from 'react';
import { useUser } from '@hooks/useUser';
import Form from '@components/AssignmentSchema/Form/Form';

import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { requestWithNotify } from '@utils/requestWithNotify';

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
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const form = useForm({
    initialValues,
  });

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      tasks: form.values['tasks'].map((task: Item) => task.value),
      tags: form.values['tags'].map((tag: Item) => tag.value),
      author: user?.login || '',
      duration: form.values.defaultDuration * 60 * 1000, // from minutes to milliseconds
    };
    requestWithNotify(
      'assignment/schema/add',
      'POST',
      locale.notify.assignmentSchema.create,
      lang,
      (response: IAssignmentSchema) => response.spec,
      body
    );
  }, [form.values, user?.login, locale, lang]);

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
