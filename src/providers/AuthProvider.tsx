import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { FC, memo, ReactNode, useEffect, useState } from 'react';

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { user, refresh } = useUser();

  const [updateUser, setUpdateUser] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setUpdateUser(true);
    } else {
      setUpdateUser(false);
    }
  }, [user]);

  useEffect(() => {
    refresh().then(() => {
      // console.log(user);
      // console.log(router);
      if (user === undefined) {
        router.push({
          pathname: '/login',
          query: {
            referrer: router.asPath,
          },
        });
      }
    });
    // eslint-disable-next-line
  }, [updateUser, refresh, router]);

  return <>{updateUser ? <></> : children}</>;
};

export default memo(AuthProvider);
