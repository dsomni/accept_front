import { ReactNode, useCallback } from 'react';
import { NextPageContext } from 'next';
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
import { useUser } from '@hooks/useUser';
import { concatDateTime } from '@utils/datetime';

const initialValues = (origin: string, duration: number) => {
  let endDate = new Date();
  let endTime = new Date(endDate);
  endDate.setMinutes(endDate.getMinutes() + duration);
  endTime.setMinutes(endTime.getMinutes() + duration);

  return {
    origin,
    starter: '',
    startDate: new Date(10),
    startTime: new Date(),
    endDate,
    endTime,
    groups: ['5fff0231-522c-496c-a870-0ce4e7051f87'],
    infinite: false,
    status: 0,
    dates: 0,
  };
};

interface IProps extends IAssignmentAddBundle {
  origin: string;
  duration: number;
}

function AssignmentAdd(props: IProps) {
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const form = useForm({
    initialValues: initialValues(props.origin, props.duration),
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

    const assignment = {
      spec: '',
      origin: form.values.origin,
      starter: user?.login || '',
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
      'assignment/add',
      'POST',
      locale.notify.assignment.create,
      lang,
      (response) => response.spec,
      assignment
    );
  }, [form, lang, locale, user]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={locale.create}
        assignment_schemas={props.assignment_schemas}
        groups={props.groups}
      />
    </>
  );
}

AssignmentAdd.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentAdd;

const API_URL = getApiUrl();

AssignmentAdd.getInitialProps = async ({
  res,
  query,
}: NextPageContext) => {
  const response = await fetch(
    `${API_URL}/api/bundle/assignment-add`
  ).catch(() => ({ status: 404 }));
  if (response instanceof Response && response.status === 200) {
    const response_json = await response.json();
    return {
      assignment_schemas: response_json.schemas,
      groups: response_json.groups,
      origin: (query.origin as string) || '',
      duration: +(query.duration || 0),
    };
  }
  if (res) {
    res.writeHead(307, { Location: '/404' });
    res.end();
  }
};
