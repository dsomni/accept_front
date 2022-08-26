import { ReactNode, useCallback, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { DefaultLayout } from '@layouts/DefaultLayout';
import {
  IAssignmentAdd,
  IAssignmentAddBundle,
} from '@custom-types/data/IAssignment';
import Form from '@components/Assignment/Form/Form';
import { useLocale } from '@hooks/useLocale';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import { requestWithNotify } from '@utils/requestWithNotify';
import { useUser } from '@hooks/useUser';
import { concatDateTime } from '@utils/datetime';
import { UseFormReturnType } from '@mantine/form/lib/types';
import { useRouter } from 'next/router';

function AssignmentAdd(props: IAssignmentAddBundle) {
  const { locale, lang } = useLocale();
  const { user } = useUser();
  const router = useRouter();

  const [initialValues, setInitialValues] = useState({
    origin: '',
    starter: '',
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
    groups: ['5fff0231-522c-496c-a870-0ce4e7051f87'],
    infinite: false,
    status: 0,
    dates: 0,
  });

  useEffect(() => {
    const origin = (router.query.origin as string) || '';
    const duration = +(router.query.duration || 0);
    if (origin || duration) {
      let endDate = new Date();
      let endTime = new Date(endDate);
      endDate.setMinutes(endDate.getMinutes() + duration);
      endTime.setMinutes(endTime.getMinutes() + duration);
      setInitialValues((initialValues) => ({
        ...initialValues,
        origin,
        endDate,
        endTime,
      }));
    }
  }, [router.query.duration, router.query.origin]);

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
    },
    [lang, locale, user]
  );

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        buttonLabel={locale.create}
        initialValues={initialValues}
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

export const getStaticProps: GetStaticProps = async () => {
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
