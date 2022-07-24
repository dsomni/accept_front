import { FC, memo, useCallback } from 'react';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@mantine/core';

import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import styles from './signIn.module.css';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';
import signIn from 'pages/api/auth/signin';

const SignIn: FC = () => {
  const { locale } = useLocale();
  const { user, signOut } = useUser();
  const router = useRouter();

  const handleSignOut = useCallback(() => {
    const id = newNotification({
      title: locale.notify.auth.signOut.loading,
      message: locale.loading + '...',
    });
    signOut().then((res) => {
      if (res) {
        successNotification({
          id,
          title: locale.notify.auth.signOut.success,
          autoClose: 5000,
        });
      } else {
        errorNotification({
          id,
          title: locale.notify.auth.signOut.error,
          autoClose: 5000,
        });
      }
    });
  }, [locale, signOut]);

  return (
    <>
      {!user ? (
        <Button
          className={styles.button}
          onClick={() =>
            router.push({
              pathname: '/signin',
              query: {
                referrer: router.asPath,
              },
            })
          }
        >
          {locale.mainHeaderLinks.signin}
        </Button>
      ) : (
        <Button
          className={styles.button}
          onClick={() => handleSignOut()}
        >
          {locale.mainHeaderLinks.signout}
        </Button>
      )}
    </>
  );
};

export default SignIn;
