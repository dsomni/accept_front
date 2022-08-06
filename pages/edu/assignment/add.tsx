import { ReactNode, useCallback, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { DefaultLayout } from '@layouts/DefaultLayout';
import {
  IAssignmentAdd,
  IAssignmentAddBundle,
} from '@custom-types/data/IAssignment';
import Form from '@components/Assignment/Form/Form';
import { useForm } from '@mantine/form';
import { useLocale } from '@hooks/useLocale';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import { requestWithNotify } from '@utils/requestWithNotify';

const initialValues = {
  origin: '',
  starter: '',
  startDate: new Date(),
  startTime: new Date(),
  endDate: new Date(),
  endTime: new Date(),
  groups: [],
  infinite: false,
  status: 0,
  dates: 0,
};

function AssignmentAdd(props: IAssignmentAddBundle) {
  const { locale, lang } = useLocale();

  const form = useForm({
    initialValues,
    validate: {
      origin: (value) =>
        value.length == 0
          ? locale.assignment.form.validation.origin
          : null,
      startDate: (value, values) =>
        !values.startDate
          ? locale.assignment.form.validation.startDate
          : values.infinite
          ? null
          : !values.endDate
          ? locale.assignment.form.validation.endDate
          : null,
      startTime: (value) =>
        !value ? locale.assignment.form.validation.startTime : null,
      endTime: (value, values) =>
        values.infinite
          ? null
          : !value
          ? locale.assignment.form.validation.endTime
          : null,
      dates: (value, values) =>
        values.infinite
          ? null
          : values.startDate &&
            values.endDate &&
            values.startDate.getTime() + values.startTime.getTime() >=
              values.endDate.getTime() + values.endTime.getTime()
          ? locale.assignment.form.validation.date
          : null,
      groups: (value) =>
        value.length == 0
          ? locale.assignment.form.validation.groups
          : null,
    },
  });

  const handleSubmit = useCallback(() => {
    if (form.validate().hasErrors) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.notify.group.validation.error,
        autoClose: 5000,
      });
      return;
    }
    const assignment = form.values;
    requestWithNotify<IAssignmentAdd, boolean>(
      'group/add',
      'POST',
      locale.notify.assignment.create,
      lang,
      (response: boolean) => '',
      assignment
    );
  }, [form, lang, locale]);

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
