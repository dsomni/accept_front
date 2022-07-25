import { useLocale } from '@hooks/useLocale';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from '@mantine/form';
import { ITaskDisplay } from '@custom-types/data/ITask';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import Form from '@components/AssignmentSchema/Form/Form';
import { requestWithNotify } from '@utils/requestWithNotify';
import { getApiUrl } from '@utils/getServerUrl';
import { GetStaticPaths, GetStaticProps } from 'next';

function EditAssignmentSchema({assignment_schema}:{assignment_schema: IAssignmentSchema}) {
  const { locale, lang } = useLocale();

  const router = useRouter();


  const formValues = useMemo(
    () => ({
      ...assignment_schema,
      author: assignment_schema.author.login,
      tags: assignment_schema.tags.map(tag => ({
        label: tag.title,
        value: tag.spec
      })),
      tasks: assignment_schema.tasks
        .map((task: ITaskDisplay) => ({
          label: task?.title,
          value: task?.spec,
        })),
    }),
    [assignment_schema]
  );
  const form = useForm({
    initialValues: formValues,
  });

  useEffect(() => {
    form.setValues(formValues);
  }, [formValues]); // eslint-disable-line

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      tasks: form.values['tasks'].map((task: Item) => task.value),
      tags: form.values['tags'].map((tag: Item) => tag.value),
    };
    requestWithNotify(
      `assignments_schema/edit`,
      'POST',
      locale.notify.assignmentSchema.edit,
      lang,
      (response: IAssignmentSchema) => response.spec,
      body
    );
  }, [form.values, locale, assignment_schema.spec, lang]);

  return (
    <>
      <Form
        form={form}
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
