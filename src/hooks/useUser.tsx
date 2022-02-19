import { ILocaleContext } from '@custom-types/ILocale';
import { IUser, IUserContext } from '@custom-types/IUser';
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
    const response = await fetch('/api/auth/whoami');
    if (response.status === 200) {
      const user = await response.json();
      setValue((prev) => ({
        ...prev,
        user: user as IUser,
      }));
    }
    if (response.status === 401) {
      setValue((prev) => ({
        ...prev,
        user: undefined,
      }));
    }
  }, []);
  const signIn = useCallback(
    async (login: string, password: string) => {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      if (res.status == 200) {
        await whoAmI();
      }
    },
    [whoAmI]
  );

  const signOut = useCallback(async () => {
    const res = await fetch('/api/auth/signout');
    if (res.status == 200) {
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
    user: undefined,
    signIn,
    signOut,
  }));

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  return useContext(UserContext);
}
