import Head from 'next/head';
import { FC } from 'react';
import Navbar from '@components/layout/Navbar/Navbar';
import Footer from '@components/layout/Footer/Footer';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Accept</title>
      </Head>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
    </>
  );
};
