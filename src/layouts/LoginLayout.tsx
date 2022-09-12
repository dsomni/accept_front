import Image from 'next/image';
import { FC, ReactNode } from 'react';
import { Center } from '@mantine/core';
import logo from 'public/logo.svg';

import styles from '@styles/layouts/login.module.css';

import { useLocale } from '@hooks/useLocale';
import Head from 'next/head';
export const LoginLayout: FC<{
  title: 'login' | 'registration';
  children: ReactNode;
}> = ({ title, children }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>
          {locale.auth[title]} | {locale.accept}
        </title>
      </Head>
      <Center className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.logoWrapper}>
            <Image
              src={logo}
              width={50}
              height={50}
              alt="Logo image"
            />
            <div className={styles.title}>
              {locale.accept} | {locale.auth[title]}
            </div>
          </div>
          {children}
        </div>
      </Center>
    </div>
  );
};
