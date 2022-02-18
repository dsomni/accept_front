import { LocaleProvider } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import '@styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

function Accept({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <LocaleProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </LocaleProvider>
    </SessionProvider>
  );
}

export default Accept;
