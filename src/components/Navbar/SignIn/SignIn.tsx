import { FC, memo } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useLocale } from '@hooks/useLocale';
import styles from './signIn.module.css';
import { Button } from '@mantine/core';
import { capitalize } from '@utils/capitalize';

const SignIn: FC = () => {
  const { locale } = useLocale();
  const { data: session, status } = useSession();
  return (
    <>
      {!(status === 'authenticated') ? (
        <Button className={styles.button} onClick={() => signIn()}>
          {capitalize(locale.mainHeaderLinks.signin)}
        </Button>
      ) : (
        <Button className={styles.button} onClick={() => signOut()}>
          {capitalize(locale.mainHeaderLinks.signout)}
        </Button>
      )}
    </>
  );
};

export default memo(SignIn);
