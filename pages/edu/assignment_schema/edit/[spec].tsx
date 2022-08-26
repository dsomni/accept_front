import { useLocale } from '@hooks/useLocale';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { ITaskDisplay } from '@custom-types/data/ITask';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import Form from '@components/AssignmentSchema/Form/Form';
import { requestWithNotify } from '@utils/requestWithNotify';
import { getApiUrl } from '@utils/getServerUrl';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

function EditAssignmentSchema({
  assignment_schema,
}: {
  assignment_schema: IAssignmentSchema;
}) {
  const { locale, lang } = useLocale();

  const formValues = useMemo(
    () => ({
      ...assignment_schema,
      author: assignment_schema.author,
      tags: assignment_schema.tags.map((tag) => ({
        label: tag.title,
        value: tag.spec,
      })),
      tasks: assignment_schema.tasks.map((task: ITaskDisplay) => ({
        label: task?.title,
        value: task?.spec,
      })),
      defaultDuration: Math.floor(
        assignment_schema.defaultDuration / 60 / 1000
      ),
    }),
    [assignment_schema]
  );

  const handleSubmit = useCallback(
    (form: UseFormReturnType<any>) => {
      if (form.validate().hasErrors) {
        const id = newNotification({});
        errorNotification({
          id,
          title: locale.validationError,
          autoClose: 5000,
        });
        return;
      }
      let body: any = {
        ...form.values,
        tasks: form.values['tasks'].map((task: Item) => task.value),
        tags: form.values['tags'].map((tag: Item) => tag.value),
        defaultDuration: form.values.defaultDuration * 60 * 1000, // from minutes to milliseconds
      };
      requestWithNotify(
        `assignment_schema/edit`,
        'POST',
        locale.notify.assignmentSchema.edit,
        lang,
        (response: IAssignmentSchema) => response.spec,
        body
      );
    },
    [locale, lang]
  );

  return (
    <>
      <Form
        initialValues={formValues}
        handleSubmit={handleSubmit}
        buttonLabel={locale.form.update}
      />
    </>
  );
}

EditAssignmentSchema.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditAssignmentSchema;

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
  const assignmentSchemaResponse = await fetch(
    `${API_URL}/api/assignment_schema/${params.spec}`
  );
  if (assignmentSchemaResponse.status === 200) {
    const assignmentSchema: IAssignmentSchema =
      await assignmentSchemaResponse.json();
    return {
      props: {
        assignment_schema: assignmentSchema,
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
