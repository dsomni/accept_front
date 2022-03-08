import { ILocaleContext } from '@custom-types/ILocale';
import { IUser, IUserContext } from '@custom-types/IUser';
import { sendRequest, isSuccessful } from '@requests/request';
import { userInfo } from 'os';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const UserContext = createContext<IUserContext>(null!);

export const UserProvider: FC = ({ children }) => {
  const whoAmI = useCallback(async () => {
    const response = await sendRequest<{}, IUser>(
      'auth/whoami',
      'GET'
    );
    if (response) {
      setValue((prev) => ({
        ...prev,
        user: response,
      }));
    } else {
      setValue((prev) => ({
        ...prev,
        user: undefined,
      }));
    }
  }, []);

  const refresh = useCallback(async () => {
    const success = await isSuccessful('auth/refresh', 'GET');
    if (success) {
      await whoAmI();
    }
  }, [whoAmI]);

  const signIn = useCallback(
    async (login: string, password: string) => {
      const res = await isSuccessful('auth/signin', 'POST', {
        login: login,
        password: password,
      });
      if (res) {
        await whoAmI();
      }
    },
    [whoAmI]
  );

  const signOut = useCallback(async () => {
    const success = await isSuccessful('auth/signout', 'GET');
    if (success) {
      setValue((prev) => ({
        ...prev,
        user: undefined,
      }));
    }
  }, []);

  useEffect(() => {
    whoAmI();
  }, [whoAmI]);

  const [value, setValue] = useState<IUserContext>(() => ({
    user: null,
    signIn,
    signOut,
    refresh,
  }));

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
