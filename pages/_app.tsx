import { LocaleProvider } from '@hooks/useLocale';
import { UserProvider } from '@hooks/useUser';
import { NotificationsProvider } from '@mantine/notifications';
import '@styles/globals.css';
import { getServerUrl } from '@utils/getServerUrl';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const SERVER_URL = getServerUrl();

function getTaskSpec(url: string): string {
  const list = url.split('/');
  if (
    url.startsWith('/edu/task') &&
    list.length == 4 &&
    list[3].length > 6
  ) {
    return list[3];
  }
  return '';
}

function Accept({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  useEffect(() => {
    router.events.on(
      'beforeHistoryChange',
      async (url, { shallow }) => {
        const task_spec = getTaskSpec(url);
        // has spec
        if (task_spec) {
          await fetch(`${SERVER_URL}/api/revalidate/task`, {
            method: 'POST',
            body: JSON.stringify({ spec: task_spec }),
          });
        }
      }
    );
  }, [router]);

  return (
    <NotificationsProvider
      position="bottom-center"
      zIndex={9999}
      limit={5}
      autoClose={60000}
    >
      <UserProvider>
        <LocaleProvider>
          {getLayout(<Component {...pageProps} />)}
        </LocaleProvider>
      </UserProvider>
    </NotificationsProvider>
  );
}

export default Accept;
