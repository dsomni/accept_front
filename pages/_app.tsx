import { LocaleProvider } from '@hooks/useLocale';
import { UserProvider } from '@hooks/useUser';
import '@styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function Accept({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <UserProvider>
      <LocaleProvider>{getLayout(<Component {...pageProps} />)}</LocaleProvider>
    </UserProvider>
  );
}

export default Accept;
