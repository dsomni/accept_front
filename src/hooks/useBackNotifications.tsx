import ReadModal from '@components/Notification/ReadModal/ReadModal';
import { INotification } from '@custom-types/data/notification';
import { useLocalStorage } from '@mantine/hooks';
import { IResponse, sendRequest } from '@requests/request';
import { getCookie, setCookie } from '@utils/cookies';
import {
  infoNotification,
  newNotification,
} from '@utils/notificationFunctions';
import { requestWithError } from '@utils/requestWithError';
import {
  createContext,
  FC,
  ReactNode,
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
  fetchNotificationsAmount: () => void;
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

  const [amount, setAmount] = useLocalStorage({
    key: 'notifications_amount',
    defaultValue: '-1',
  });
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const fetchNotificationsAmount = useCallback(
    (first: boolean) => {
      if (user) {
        sendRequest<undefined, number>(
          'notification/amount',
          'GET'
        ).then((res: IResponse<number>) => {
          if (!res.error) {
            if (
              (Number(amount) >= 0 || first) &&
              res.response > (amount || 0)
            ) {
              const id = newNotification({});
              infoNotification({
                id,
                title: locale.notify.notification.hasNew,
                message: locale.notify.notification.amount(
                  res.response
                ),
              });
            }
            setAmount(res.response.toString());
          }
        });
      }
    },
    [amount, locale.notify.notification, setAmount, user]
  );

  useEffect(() => {
    fetchNotificationsAmount(true);
  }, []); // eslint-disable-line

  useEffect(() => {
    const id = setInterval(
      () => fetchNotificationsAmount(false),
      60000
    );
    return () => {
      clearInterval(id);
    };
  }, [fetchNotificationsAmount]);

  const fetchNotifications = useCallback(() => {
    setLoading(true);
    sendRequest<undefined, INotification[]>(
      'notification/new',
      'GET'
    ).then((res) => {
      if (!res.error) {
        setNotifications(res.response);
      }
      setLoading(false);
    });
  }, []);

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
            setTimeout(fetchNotificationsAmount, 500);
          }
        );
      }
    },
    [fetchNotificationsAmount, lang]
  );

  const value: INotificationContext = useMemo(
    () => ({
      amount: Number(amount),
      notifications,
      sendViewed,
      loading,
      openModal: handleOpenModal,
      fetchNotificationsAmount: () => fetchNotificationsAmount(false),
      close: () => setOpened(false),
    }),
    [
      amount,
      notifications,
      sendViewed,
      loading,
      handleOpenModal,
      fetchNotificationsAmount,
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
