import { IUser, IUserContext } from '@custom-types/data/IUser';
import { sendRequest, isSuccessful } from '@requests/request';
import { getCookie } from '@utils/cookies';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const UserContext = createContext<IUserContext>(null!);

export const UserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const whoAmI = useCallback(async () => {
    const res = await sendRequest<{}, IUser>('auth/whoami', 'GET');
    if (!res.error) {
      setValue((prev) => ({
        ...prev,
        user: res.response,
      }));
    } else {
      setValue((prev) => ({
        ...prev,
        user: undefined,
      }));
    }
  }, []);

  const refresh = useCallback(async () => {
    const res = await isSuccessful('auth/refresh', 'GET');
    if (!res.error) {
      await whoAmI();
    }
  }, [whoAmI]);

  const signIn = useCallback(
    async (login: string, password: string) => {
      const res = await isSuccessful('auth/signin', 'POST', {
        login: login,
        password: password,
      });
      if (!res.error) {
        await whoAmI();
        return true;
      }
      return false;
    },
    [whoAmI]
  );

  const signOut = useCallback(async () => {
    const res = await isSuccessful('auth/signout', 'GET');
    if (!res.error) {
      setValue((prev) => ({
        ...prev,
        user: undefined,
      }));
      return true;
    }
    return false;
  }, []);

  const [value, setValue] = useState<IUserContext>(() => ({
    user: null,
    signIn,
    signOut,
    refresh,
  }));

  useEffect(() => {
    if (getCookie('access_token_cookie')) {
      console.log(value.user);
      if (!value.user) {
        whoAmI();
      }
    } else if (getCookie('refresh_token_cookie')) {
      refresh();
    } else {
      setValue((prev) => ({
        ...prev,
        user: undefined,
      }));
    }
  }, []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
