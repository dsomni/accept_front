import { ReactNode, useCallback } from 'react';
import { GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { IAssignmentAddBundle } from '@custom-types/data/IAssignment';
import Form from '@components/Assignment/Form/Form';
import { useForm } from '@mantine/form';
import { useLocale } from '@hooks/useLocale';

const initialValues = {
  origin: '',
  starter: '',
  startDate: null,
  startTime: '',
  endDate: null,
  endTime: '',
  groups: [],
  isInfinite: false,
  status: 0,
};

function AssignmentAdd(props: IAssignmentAddBundle) {
  const form = useForm({ initialValues });
  const { locale } = useLocale();

  const handleSubmit = useCallback(() => {
    console.log(form.values);
  }, [form.values]);

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
  const response = await fetch(
    `${API_URL}/api/bundle/assignment-add`
  );
  if (response.status === 200) {
    const response_json = await response.json();
    return {
      props: {
        assignment_schemas: response_json.schemas,
        groups: response_json.groups,
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
