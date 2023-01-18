import Image from 'next/legacy/image';
import { FC, ReactNode } from 'react';
import { Center } from '@mantine/core';
import logo from 'public/logo.svg';
import styles from '@styles/layouts/login.module.css';
import { useLocale } from '@hooks/useLocale';
import Title from '@ui/Title/Title';

export const LoginLayout: FC<{
  title: 'login' | 'registration';
  children: ReactNode;
}> = ({ title, children }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.pageWrapper}>
      <Title title={locale.auth[title]} />
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
