import '@styles/globals.css';
import type { AppProps } from 'next/app';

function Accept({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Accept;
