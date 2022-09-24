import { FC, ReactNode } from 'react';
import Navbar from '@components/layout/Navbar/Navbar';
import Footer from '@components/layout/Footer/Footer';

export const DefaultLayout: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
    </>
  );
};
