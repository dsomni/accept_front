import { BackNotificationsProvider } from '@hooks/useBackNotifications';
import { LocaleProvider } from '@hooks/useLocale';
import { UserProvider } from '@hooks/useUser';
import { WidthProvider } from '@hooks/useWidth';
import { NotificationsProvider } from '@mantine/notifications';
import '@styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function Accept({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MantineProvider
      theme={{
        colors: {
          white: ['#ffffff'],
        },
      }}
    >
      <WidthProvider>
        <LocaleProvider>
          <UserProvider>
            <NotificationsProvider
              position="bottom-left"
              zIndex={9999}
              limit={5}
              autoClose={40000}
            >
              <BackNotificationsProvider>
                {getLayout(<Component {...pageProps} />)}
              </BackNotificationsProvider>
            </NotificationsProvider>
          </UserProvider>
        </LocaleProvider>
      </WidthProvider>
    </MantineProvider>
  );
}

export default Accept;
