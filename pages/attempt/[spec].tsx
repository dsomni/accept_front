import { ReactNode, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { IAttempt } from '@custom-types/data/IAttempt';

import { Tabs } from '@ui/basics';
import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import Info from '@components/Attempt/Info/Info';
import Code from '@components/Attempt/Code/Code';

function Assignment(props: { attempt: IAttempt }) {
  const attempt = props.attempt;

  const { locale } = useLocale();

  const pages = useMemo(
    () => [
      {
        value: 'info',
        title: locale.task.description.self,
        page: (_: string | null, __: setter<string | null>) => (
          <Info attempt={attempt} />
        ),
      },
      {
        value: 'code',
        title: locale.task.send,
        page: (_: string | null, __: setter<string | null>) => (
          <Code attempt={attempt} />
        ),
      },
    ],
    [attempt, locale.task.description.self, locale.task.send]
  );

  return (
    <>
      <Tabs pages={pages} defaultPage={'info'} />
    </>
  );
}

Assignment.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Assignment;

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
    `${API_URL}/api/attempt/${params.spec}`
  );
  if (response.status === 200) {
    const attempt = await response.json();
    return {
      props: {
        attempt,
      },
      revalidate: attempt.status.spec === 2 ? 10 * 60 * 60 : 20,
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
