import { ReactNode, useCallback } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { DefaultLayout } from '@layouts/DefaultLayout';
import {
  IAssignmentAdd,
  IAssignmentEditBundle,
} from '@custom-types/data/IAssignment';
import Form from '@components/Assignment/Form/Form';
import { UseFormReturnType } from '@mantine/form';
import { useLocale } from '@hooks/useLocale';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import { requestWithNotify } from '@utils/requestWithNotify';
import { concatDateTime } from '@utils/datetime';

function AssignmentEdit(props: IAssignmentEditBundle) {
  const { locale, lang } = useLocale();

  const initialValues = {
    ...props.assignment,
    startDate: new Date(props.assignment.start),
    startTime: new Date(props.assignment.start),
    endDate: new Date(props.assignment.end),
    endTime: new Date(props.assignment.end),
  };

  const handleSubmit = useCallback(
    (form: UseFormReturnType<typeof initialValues>) => {
      if (form.validate().hasErrors) {
        const id = newNotification({});
        errorNotification({
          id,
          title: locale.notify.group.validation.error,
          autoClose: 5000,
        });
        return;
      }

      const assignment = {
        spec: form.values.spec,
        origin: form.values.origin,
        starter: form.values.starter,
        status: form.values.status,
        infinite: form.values.infinite,
        start: concatDateTime(
          form.values.startDate,
          form.values.startTime
        ),
        end: concatDateTime(form.values.endDate, form.values.endTime),
        groups: form.values.groups,
      };

      requestWithNotify<IAssignmentAdd, IAssignmentAdd>(
        `assignment/edit`,
        'POST',
        locale.notify.assignment.edit,
        lang,
        (response: IAssignmentAdd) => response.spec,
        assignment
      );
    },
    [lang, locale]
  );

  return (
    <>
      <Form
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        buttonLabel={locale.edit}
        {...props}
      />
    </>
  );
}

AssignmentEdit.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentEdit;

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
        assignment_schemas: response_json.schemas,
        groups: response_json.groups,
        assignment: response_json.assignment,
      },
      revalidate: 3 * 60, //seconds
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
