import { ReactNode, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { Tabs } from '@ui/basics';
import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import Info from '@components/Attempt/Info/Info';
import Code from '@components/Attempt/Code/Code';
import Title from '@ui/Title/Title';
import { IAttempt } from '@custom-types/data/IAttempt';
import styles from '@styles/attempt.module.css';

function Assignment(props: { attempt: IAttempt; author: string }) {
  const attempt = props.attempt;
  const author = props.author;
  const { user, isTeacher } = useUser();
  const { locale } = useLocale();

  const pages = useMemo(
    () => [
      {
        value: 'info',
        title: locale.attempt.pages.info,
        page: (_: string | null, __: setter<string | null>) => (
          <Info attempt={attempt} />
        ),
      },
      {
        value: 'code',
        title: locale.attempt.pages.code,
        page: (_: string | null, __: setter<string | null>) => (
          <Code attempt={attempt} />
        ),
      },
    ],
    [attempt, locale]
  );

  return (
    <div className={styles.wrapper}>
      <Title
        title={`${locale.titles.attempt} ${attempt.author.login}`}
      />

      {(!!user && user.login == author) || isTeacher ? (
        <Tabs pages={pages} defaultPage={'info'} />
      ) : (
        <div className={styles.notAllowed}>
          {locale.attempt.notAllowed}
        </div>
      )}
    </div>
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
    `${API_URL}/api/bundle/attempt/${params.spec}`
  );
  if (response.status === 200) {
    const res = await response.json();
    return {
      props: {
        attempt: res.attempt,
        author: res.author,
      },
      revalidate: res.attempt.status.spec === 2 ? 10 * 60 * 60 : 20,
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
