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
import { useUser } from './useUser';

import io from 'socket.io-client';

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
  notifyAboutCreation: (_: string) => void;
}

const BackNotificationsContext = createContext<INotificationContext>(
  null!
);

export const BackNotificationsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { lang } = useLocale();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<INotification[]>(
    []
  );

  const socket = useMemo(
    () =>
      typeof window !== 'undefined' && user?.login
        ? io(`${process.env.WEBSOCKET_API}`, {
            path: `/ws/notification`,
            autoConnect: false,
          })
        : undefined,
    [user?.login]
  );

  useEffect(() => {
    if (!socket) return;
    socket.connect();
    socket.on('connect', () =>
      socket.emit('register', user?.login || '')
    );
    socket.on('disconnect', () => {
      socket.connect();
    });
    socket.on('notification', (response) => {
      const shouldRefetch = JSON.parse(response) as boolean;
      if (shouldRefetch) fetchNotifications();
    });

    // Clean-up
    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('disconnect');
      socket.removeAllListeners('notification');
    };
  }, [socket]); // eslint-disable-line

  const handleSend = useCallback(
    (spec: string) => {
      if (socket?.connected) {
        socket.emit('new_notification', spec);
      }
    },
    [socket]
  );

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
            onSuccess();
            setTimeout(fetchNotifications, 500);
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
      refetchNewNotifications: () => fetchNotifications,
      notifyAboutCreation: handleSend,
    }),
    [
      notifications,
      sendViewed,
      loading,
      fetchNotifications,
      handleSend,
    ]
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
