import Image from 'next/image';
import { FC } from 'react';
import { Button, Center } from '@mantine/core';
import logo from 'public/logo.svg';
import { capitalize } from '@utils/capitalize';
import styles from '@styles/layouts/login.module.css';

import { useLocale } from '@hooks/useLocale';
export const LoginLayout: FC<{ title: string }> = ({
  title,
  children,
}) => {
  const { locale } = useLocale();

  return (
    <div className={styles.pageWrapper}>
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
              {capitalize(locale.accept)} | {title}
            </div>
          </div>
          {children}
        </div>
      </Center>
    </div>
  );
};
