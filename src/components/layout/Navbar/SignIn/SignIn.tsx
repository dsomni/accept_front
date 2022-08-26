import { FC } from 'react';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@mantine/core';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import styles from './signIn.module.css';

import ProfileMenu from '@ui/ProfileMenu/ProfileMenu';

const SignIn: FC = () => {
  const { locale } = useLocale();
  const router = useRouter();
  const { user } = useUser();

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
        <ProfileMenu />
      )}
    </>
  );
};

export default SignIn;
