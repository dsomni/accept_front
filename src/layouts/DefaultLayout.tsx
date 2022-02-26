import Head from 'next/head';
import { FC } from 'react';
import Navbar from '@components/Navbar/Navbar';
import Footer from '@components/Footer/Footer';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Accept</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
