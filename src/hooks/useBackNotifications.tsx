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
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<INotification[]>(
    []
  );

  const { lang } = useLocale();
  const { user } = useUser();

  // const [webSocket, setWebSocket] = useState<WebSocket>();
  const webSocket = useMemo(
    () =>
      typeof window !== 'undefined' && user?.login
        ? new WebSocket(
            `${process.env.WEBSOCKET_API}/ws/notification/${user?.login}`
          )
        : undefined,
    [user?.login]
  );

  const handleSend = useCallback(
    (spec: string) => {
      if (webSocket && webSocket.readyState === 1) {
        webSocket.send(spec);
      }
    },
    [webSocket]
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

  useEffect(() => {
    if (!webSocket) return;
    webSocket.onmessage = (event) => {
      const shouldRefetch = JSON.parse(event.data) as boolean;
      if (shouldRefetch) {
        fetchNotifications();
      }
    };
    return () => {
      webSocket.close();
    };
  }, [webSocket, fetchNotifications]);

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
