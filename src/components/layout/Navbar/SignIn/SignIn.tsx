import { FC, memo } from 'react';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import styles from './signIn.module.css';

const SignIn: FC = () => {
  const { locale } = useLocale();
  const { user, signOut } = useUser();
  const router = useRouter();
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

export default SignIn;
