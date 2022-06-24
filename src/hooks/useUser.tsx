import { IUser, IUserContext } from '@custom-types/data/IUser';
import { sendRequest, isSuccessful } from '@requests/request';
import { getCookie, setCookie } from '@utils/cookies';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cryptr from 'cryptr';

const UserContext = createContext<IUserContext>(null!);
const key = 'bug_in_maxim';

const cryptr = new Cryptr(key);

export const UserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const whoAmI = useCallback(async () => {
    const cookie_user = getCookie('user');
    if (!cookie_user) {
      const res = await sendRequest<{}, IUser>('auth/whoami', 'GET');
      if (!res.error) {
        const accessLevel = res.response.role.accessLevel;
        const user = res.response;
        setCookie('user', cryptr.encrypt(JSON.stringify(user)), {
          'max-age': 10 * 60,
          path: '/',
        });
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
    } else {
      try {
        const user = JSON.parse(cryptr.decrypt(cookie_user)) as IUser;
        setValue((prev) => ({
          ...prev,
          user: user,
          accessLevel: user.role.accessLevel,
          isUser: user.role.accessLevel > 0,
          isStudent: user.role.accessLevel > 1,
          isTeacher: user.role.accessLevel > 2,
          isAdmin: user.role.accessLevel > 50,
        }));
      } catch (error) {
        setCookie('user', '', { 'max-age': 0 });
        whoAmI();
      }
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
      whoAmI();
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
