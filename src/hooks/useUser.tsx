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
      const accessLevel = res.response.role.accessLevel;
      setValue((prev) => ({
        ...prev,
        user: res.response,
        accessLevel,
        isUser: accessLevel > 0,
        isStudent: accessLevel > 1,
        isTeacher: accessLevel > 2,
        isAdmin: accessLevel > 50,
      }));
    } else {
      setValue((prev) => ({
        ...prev,
        user: undefined,
        accessLevel: 0,
        isUser: false,
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
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
        accessLevel: 0,
        isUser: false,
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
      }));
      return true;
    }
    return false;
  }, []);

  const [value, setValue] = useState<IUserContext>(() => ({
    user: undefined,
    accessLevel: 0,
    isUser: false,
    isStudent: false,
    isTeacher: false,
    isAdmin: false,
    signIn,
    signOut,
    refresh,
  }));

  useEffect(() => {
    if (getCookie('access_token_cookie')) {
      if (!value.user) {
        whoAmI();
      }
    } else if (getCookie('refresh_token_cookie')) {
      refresh();
    } else {
      setValue((prev) => ({
        ...prev,
        user: undefined,
        accessLevel: 0,
        isUser: false,
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
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
