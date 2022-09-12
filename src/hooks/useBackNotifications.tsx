import ReadModal from '@components/Notification/ReadModal/ReadModal';
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
  amount: number;
  notifications: INotification[];
  sendViewed: (
    viewed: string[],
    messages: { error: string; loading: string },
    onSuccess: () => void
  ) => void;
  loading: boolean;
  openModal: () => void;
  close: () => void;
  refetchNewNotifications: () => void;
  notifyAboutCreation: (spec: string) => void;
}

const BackNotificationsContext = createContext<INotificationContext>(
  null!
);

export const BackNotificationsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<INotification[]>(
    []
  );

  const { lang } = useLocale();
  const { user } = useUser();

  const [webSocket, setWebSocket] = useState<WebSocket>();

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
    if (!user) return;
    const ws = new WebSocket(
      `ws://${
        process.env.API_ENDPOINT?.split('://')[1]
      }/ws/notification/${user?.login}`
    );

    ws.onmessage = (event) => {
      const shouldRefetch = JSON.parse(event.data) as boolean;
      if (shouldRefetch) {
        fetchNotifications();
      }
    };

    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, [fetchNotifications, user]);

  const handleOpenModal = useCallback(() => {
    fetchNotifications();
    setOpened(true);
  }, [fetchNotifications]);

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
      amount: notifications.length,
      notifications,
      sendViewed,
      loading,
      openModal: handleOpenModal,
      close: () => setOpened(false),
      refetchNewNotifications: () => fetchNotifications,
      notifyAboutCreation: handleSend,
    }),
    [
      notifications,
      sendViewed,
      loading,
      handleOpenModal,
      fetchNotifications,
      handleSend,
    ]
  );

  return (
    <BackNotificationsContext.Provider value={value}>
      <ReadModal
        opened={opened}
        notifications={notifications}
        close={value.close}
      />
      {children}
    </BackNotificationsContext.Provider>
  );
};

export function useBackNotifications() {
  return useContext(BackNotificationsContext);
}
