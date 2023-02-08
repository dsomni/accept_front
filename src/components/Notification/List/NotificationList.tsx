import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { INotification } from '@custom-types/data/notification';
import { Badge } from '@mantine/core';
import { requestWithError } from '@utils/requestWithError';
import { useLocale } from '@hooks/useLocale';
import { useRequest } from '@hooks/useRequest';
import { useBackNotifications } from '@hooks/useBackNotifications';
import { shrinkText } from '@utils/shrinkText';
import MessageList, {
  IListAction,
  IListMessage,
} from '@ui/MessageList/MessageList';
import styles from './notificationList.module.css';
import { MailOpened, Trash } from 'tabler-icons-react';
import { setter } from '@custom-types/ui/atomic';

const NotificationList: FC<{}> = ({}) => {
  const { locale, lang } = useLocale();

  const { sendViewed, refetchNewNotifications } =
    useBackNotifications();

  const [notifications, setNotifications] = useState<INotification[]>(
    []
  );
  const processNotifications = useCallback(
    (res: INotification[]) => {
      const notifications = res
        .map((item) => ({ ...item, date: new Date(item.date) }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());
      setNotifications(notifications);
    },
    [setNotifications]
  );

  const { refetch: refetchNotifications, loading } = useRequest<
    {},
    INotification[],
    void
  >('notification/list', 'GET', undefined, processNotifications);

  const handleDelete = useCallback(
    (selected: string[], setSelected: setter<string[]>) => {
      requestWithError<string[], boolean>(
        'notification/delete',
        'POST',
        locale.notification.list.requestDelete,
        lang,
        selected,
        () => {
          setTimeout(refetchNewNotifications, 500);
          refetchNotifications();
          setSelected([]);
        }
      );
    },
    [locale, lang, refetchNotifications, refetchNewNotifications]
  );

  const handleView = useCallback(
    (selected: string[], setSelected: setter<string[]>) => {
      sendViewed(
        selected,
        locale.notification.list.requestViewed,
        () => {
          setSelected([]);
          setTimeout(refetchNotifications, 500);
          setSelected([]);
        }
      );
    },
    [
      locale.notification.list.requestViewed,
      refetchNotifications,
      sendViewed,
    ]
  );

  useEffect(() => {
    const id = setInterval(refetchNotifications, 15000);
    return () => {
      clearInterval(id);
    };
  }, [refetchNotifications]);

  const actions: IListAction[] = useMemo(
    () => [
      {
        icon: <MailOpened />,
        tooltipLabel: locale.notification.list.viewed,
        onClick: handleView,
      },
      {
        icon: <Trash />,
        tooltipLabel: locale.notification.list.delete,
        onClick: handleDelete,
      },
    ],
    [
      handleDelete,
      handleView,
      locale.notification.list.delete,
      locale.notification.list.viewed,
    ]
  );

  const messages = useMemo(
    () =>
      notifications.map(
        (item) =>
          ({
            ...item,
            subject: item.shortDescription,
            message: item.description,
          } as IListMessage)
      ),
    [notifications]
  );

  return (
    <MessageList
      messages={messages}
      actions={actions}
      messageTitle={(notification: IListMessage) => {
        return (
          <>
            {
              //@ts-ignore
              shrinkText(notification.title, 48)
            }
            {
              //@ts-ignore
              !notification.viewed && (
                <Badge color="green">{locale.new}</Badge>
              )
            }
          </>
        );
      }}
      rowClassName={(notification: IListMessage) =>
        //@ts-ignore
        !notification.viewed ? styles.new : ''
      }
      refetch={refetchNotifications}
      emptyMessage={locale.profile.empty.notification}
      loading={loading}
    />
  );
};

export default memo(NotificationList);
