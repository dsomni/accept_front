import { ReactNode, useCallback } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { IAssignmentEditBundle } from '@custom-types/data/IAssignment';
import Form from '@components/Assignment/Form/Form';
import { useForm } from '@mantine/form';
import { useLocale } from '@hooks/useLocale';

function AssignmentAdd(props: IAssignmentEditBundle) {
  const form = useForm({ initialValues: props.assignment });
  const { locale } = useLocale();

  const handleSubmit = useCallback(() => {}, []);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={locale.create}
        {...props}
      />
    </>
  );
}

AssignmentAdd.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentAdd;

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
  const response = await fetch(
    `${API_URL}/api/bundle/assignment-edit/${params.spec}`
  );
  if (response.status === 200) {
    const response_json = await response.json();
    return {
      props: {
        assignment_schemas: response_json.assignment_schemas,
        groups: response_json.groups,
        assignment: response_json.assignment,
      },
      revalidate: 10 * 60,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/Not-Found',
    },
  };
};
