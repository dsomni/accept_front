import { LocaleProvider } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import '@styles/globals.css';
import type { AppProps } from 'next/app';

function Accept({ Component, pageProps }: AppProps) {
  return (
    <LocaleProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </LocaleProvider>
  );
}

export default Accept;
