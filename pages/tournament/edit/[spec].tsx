import { ReactNode, useCallback, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useLocale } from '@hooks/useLocale';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import { requestWithNotify } from '@utils/requestWithNotify';
import { UseFormReturnType } from '@mantine/form/lib/types';
import Title from '@ui/Title/Title';
import {
  ITournamentAdd,
  ITournamentEditBundle,
} from '@custom-types/data/ITournament';
import {
  UTCDate,
  concatDateTime,
  timezoneDate,
} from '@utils/datetime';
import Form from '@components/Tournament/Form/Form';
import { useRequest } from '@hooks/useRequest';
import { IUserDisplay } from '@custom-types/data/IUser';

function TournamentEdit(props: ITournamentEditBundle) {
  const { locale, lang } = useLocale();

  const { data: users } = useRequest<{}, IUserDisplay[]>(
    'user/list-display',
    'GET'
  );

  const initialValues = useMemo(
    () => ({
      ...props.tournament,

      tags: props.tournament.tags.map((tag) => ({
        value: tag.spec,
        label: tag.title,
      })),
      assessmentType: props.tournament.assessmentType.spec.toString(),
      startDate: timezoneDate(props.tournament.start),
      startTime: timezoneDate(props.tournament.start),
      endDate: timezoneDate(props.tournament.end),
      endTime: timezoneDate(props.tournament.end),
      frozeResultsDate: timezoneDate(props.tournament.frozeResults),
      frozeResultsTime: timezoneDate(props.tournament.frozeResults),
    }),
    [props.tournament]
  );

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

      const tournament = {
        spec: form.values.spec,
        author: form.values.author,
        title: form.values.title,
        description: form.values.description,
        tasks: form.values.tasks.map((task) => task.spec),
        // @ts-ignore-line
        tags: form.values.tags.map((tag) => tag.value),
        status: form.values.status.spec,
        participants: form.values.participants,
        moderators: form.values.moderators,
        assessmentType: +form.values.assessmentType,
        shouldPenalizeAttempt: form.values.shouldPenalizeAttempt,
        allowRegistrationAfterStart:
          form.values.allowRegistrationAfterStart,
        start: UTCDate(
          concatDateTime(form.values.startDate, form.values.startTime)
        ),
        end: UTCDate(
          concatDateTime(form.values.endDate, form.values.endTime)
        ),
        frozeResults: UTCDate(
          concatDateTime(
            form.values.frozeResultsDate,
            form.values.frozeResultsTime
          )
        ),
      };

      requestWithNotify<ITournamentAdd, string>(
        'tournament/edit',
        'POST',
        locale.notify.tournament.create,
        lang,
        (response) => response,
        tournament
      );
    },
    [lang, locale]
  );

  return (
    <>
      <Title title={locale.titles.tournament.edit} />
      <Form
        handleSubmit={handleSubmit}
        buttonLabel={locale.edit}
        initialValues={initialValues}
        users={users || []}
        {...props}
      />
    </>
  );
}

TournamentEdit.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TournamentEdit;

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
    `${API_URL}/api/bundle/tournament-edit/${params.spec}`
  );
  if (response.status === 200) {
    const response_json = await response.json();
    return {
      props: {
        tournament: response_json.tournament,
        assessmentTypes: response_json.assessment_types,
        tags: response_json.tags,
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
