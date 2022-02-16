import Head from 'next/head';
import { FC } from 'react';
import Navbar from '@components/Navbar/Navbar';

export const DefaultLayout: FC<{ current: string }> = ({
  children,
  current,
}) => {
  return (
    <>
      <Head>
        <title>Accept</title>
      </Head>
      <Navbar current={current} margin={false} />
      <main>{children}</main>
    </>
  );
};
