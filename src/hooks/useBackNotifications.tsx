import ReadModal from '@components/Notification/ReadModal/ReadModal';
import { INotification } from '@custom-types/data/atomic';
import { IResponse, sendRequest } from '@requests/request';
import {
  infoNotification,
  newNotification,
} from '@utils/notificationFunctions';
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

interface INotificationContext {
  amount: number;
  notifications: INotification[];
  sendViewed: (viewed: string[]) => void;
  loading: boolean;
  openModal: () => void;
  fetchNotificationsAmount: () => void;
}

const BackNotificationsContext = createContext<INotificationContext>(
  null!
);

export const BackNotificationsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { locale } = useLocale();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(-1);
  const [notifications, setNotifications] = useState<INotification[]>(
    []
  );

  const fetchNotificationsAmount = useCallback(
    (first: boolean) => {
      sendRequest<undefined, number>(
        'notification/amount',
        'GET'
      ).then((res: IResponse<number>) => {
        if (!res.error) {
          if ((amount >= 0 || first) && res.response > amount) {
            const id = newNotification({});
            infoNotification({
              id,
              title: locale.notify.notification.hasNew,
              message: locale.notify.notification.amount(
                res.response
              ),
            });
          }
          setAmount(res.response);
        }
      });
    },
    [amount, locale]
  );

  useEffect(() => {
    console.log(1);
    fetchNotificationsAmount(true);
  }, []); // eslint-disable-line

  useEffect(() => {
    const id = setTimeout(
      () => fetchNotificationsAmount(false),
      60000
    );
    return () => {
      clearTimeout(id);
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

  const sendViewed = useCallback((viewed: string[]) => {
    if (viewed.length > 0) {
      sendRequest<string[], boolean>(
        'notification/viewed',
        'POST',
        Array.from(new Set(viewed))
      );
    }
  }, []);

  const value: INotificationContext = useMemo(
    () => ({
      amount,
      notifications,
      sendViewed,
      loading,
      openModal: handleOpenModal,
      fetchNotificationsAmount: () => fetchNotificationsAmount(false),
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
        notifications={value.notifications}
        loading={loading}
        close={() => setOpened(false)}
      />
      {children}
    </BackNotificationsContext.Provider>
  );
};

export function useBackNotifications() {
  return useContext(BackNotificationsContext);
}
