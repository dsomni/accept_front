import Form from '@components/Tournament/Form/Form';
import { useLocale } from '@hooks/useLocale';
import { ReactNode, useCallback, useEffect } from 'react';
import notificationStyles from '@styles/ui/notification.module.css';
import { useForm } from '@mantine/hooks';
import { sendRequest } from '@requests/request';
import { useUser } from '@hooks/useUser';
import { ITournament } from '@custom-types/ITournament';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { capitalize } from '@utils/capitalize';
import { requestWithNotify } from '@utils/requestWithNotify';
import { getServerUrl } from '@utils/getServerUrl';
import { GetStaticPaths, GetStaticProps } from 'next';

function EditTournament(props: { tournament: ITournament }) {
  const { locale, lang } = useLocale();
  const { user } = useUser();
  const tournament = {
    ...props.tournament,
    assessmentType: props.tournament.assessmentType.toString(),
  };

  const router = useRouter();

  const form = useForm({
    initialValues: tournament,
    validationRules: {},
  });

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      assessmentType: parseInt(form.values.assessmentType),
    };
    requestWithNotify(
      `tournament/edit/${tournament.spec}`,
      'POST',
      locale.notify.tournament.edit,
      lang,
      (response: ITournament) => response.spec,
      body
    );
  }, [form.values, locale, lang, tournament.spec]);

  return (
    <div>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={capitalize(locale.form.update)}
      />
    </div>
  );
}

EditTournament.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditTournament;

const SERVER_URL = getServerUrl();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const tournament = await fetch(`${SERVER_URL}/api/tournament`, {
    method: 'POST',
    body: JSON.stringify({ spec: params.spec }),
  });
  if (tournament.status === 200) {
    return {
      props: {
        tournament: await tournament.json(),
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
