import { INotification } from '@custom-types/data/notification';
import { sendRequest } from '@requests/request';
import {
  infoNotification,
  newNotification,
} from '@utils/notificationFunctions';

import { requestWithError } from '@utils/requestWithError';
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocale } from './useLocale';
import { getRandomIntInRange } from '@utils/random';

interface INotificationContext {
  new_amount: number;
  notifications: INotification[];
  sendViewed: (
    _: string[],
    __: { error: string; loading: string },
    ___: () => void
  ) => void;
  loading: boolean;
  refetchNewNotifications: () => void;
}

const BackNotificationsContext = createContext<INotificationContext>(
  null!
);

export const BackNotificationsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { lang } = useLocale();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<INotification[]>(
    []
  );
  const updateIntervalSeconds = getRandomIntInRange(11, 13);

  const fetchNotifications = useCallback(() => {
    setLoading(true);
    sendRequest<undefined, INotification[]>(
      'notification/new',
      'GET'
    ).then((res) => {
      if (!res.error) {
        setNotifications(res.response);
        res.response.map((notification) => {
          if (!notification.sent) {
            const id = newNotification({});
            infoNotification({
              id,
              title: notification.title,
              message: notification.shortDescription,
            });
          }
        });
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []); // eslint-disable-line

  useEffect(() => {
    const id = setInterval(
      fetchNotifications,
      updateIntervalSeconds * 1000
    );

    return () => clearInterval(id);
  }, [updateIntervalSeconds, fetchNotifications]);

  const sendViewed = useCallback(
    (
      viewed: string[],
      messages: { error: string; loading: string },
      onSuccess: () => void
    ) => {
      if (viewed.length > 0) {
        requestWithError<string[], boolean>(
          'notification/viewed',
          'POST',
          messages,
          lang,
          Array.from(new Set(viewed)),
          () => {
            setTimeout(fetchNotifications, 500);
            onSuccess();
          }
        );
      }
    },
    [fetchNotifications, lang]
  );

  const value: INotificationContext = useMemo(
    () => ({
      new_amount: notifications.filter(
        (notification) => notification.viewed == false
      ).length,
      notifications,
      sendViewed,
      loading,
      refetchNewNotifications: fetchNotifications,
    }),
    [notifications, sendViewed, loading, fetchNotifications]
  );

  return (
    <BackNotificationsContext.Provider value={value}>
      {children}
    </BackNotificationsContext.Provider>
  );
};

export function useBackNotifications() {
  return useContext(BackNotificationsContext);
}
