import {
  useState,
  ReactNode,
  useCallback,
  useEffect,
  ChangeEvent,
} from 'react';
import { DefaultLayout } from '@layouts/DefaultLayout';
import styles from '@styles/notification/list.module.css';
import {
  INotification,
  INotificationRecord,
} from '@custom-types/data/notification';

import { Checkbox } from '@mantine/core';
import { Button } from '@ui/basics';
import { requestWithNotify } from '@utils/requestWithNotify';
import { useLocale } from '@hooks/useLocale';
import { useRequest } from '@hooks/useRequest';
import { getLocalDate } from '@utils/datetime';
import { useBackNotifications } from '@hooks/useBackNotifications';

interface INotificationItem extends INotification {
  new: boolean;
}

function List() {
  const [notifications, setNotifications] = useState<
    INotificationItem[]
  >([]);

  const { locale, lang } = useLocale();

  const [selected, setSelected] = useState<string[]>([]);

  const processNotifications = useCallback(
    (res: INotificationRecord) => {
      const newNotifications = res.new_notifications;
      const oldNotifications = res.notifications;
      const processedNotifications = [];
      for (let i = 0; i < newNotifications.length; i++) {
        const notification: INotificationItem = {
          ...newNotifications[i],
          new: true,
        };
        processedNotifications.push(notification);
      }
      for (let i = 0; i < oldNotifications.length; i++) {
        const notification: INotificationItem = {
          ...oldNotifications[i],
          new: false,
        };
        processedNotifications.push(notification);
      }
      setNotifications(processedNotifications);
    },
    [setNotifications]
  );

  const { refetch: refetchNotifications } = useRequest<
    {},
    INotificationRecord,
    void
  >('notification/list', 'GET', undefined, processNotifications);

  const onCheckboxCheck = useCallback(
    (notification: INotificationItem) => {
      return (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.checked) {
          setSelected((selected) => {
            let processedSelected = [...selected];
            processedSelected.push(notification.spec);
            return processedSelected;
          });
        } else {
          setSelected((selected) => {
            let processedSelected = [...selected];
            const idx = processedSelected.findIndex(
              (value) => value == notification.spec
            );
            if (idx >= 0) processedSelected.splice(idx, 1);
            return processedSelected;
          });
        }
      };
    },
    []
  );

  const handleDelete = useCallback(() => {
    requestWithNotify<string[], boolean>(
      'notification/delete',
      'POST',
      { loading: 'loading', success: 'success', error: 'error' },
      lang,
      () => '',
      selected,
      () => {
        setSelected([]);
        refetchNotifications();
      }
    );
  }, [lang, refetchNotifications, selected, setSelected]);

  const handleView = useCallback(() => {
    requestWithNotify<string[], boolean>(
      'notification/viewed',
      'POST',
      { loading: 'loading', success: 'success', error: 'error' },
      lang,
      () => '',
      selected,
      () => {
        setSelected([]);
        setTimeout(refetchNotifications, 500);
      }
    );
  }, [lang, refetchNotifications, selected, setSelected]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.utils}>
        {selected.length == notifications.length ? (
          <Button onClick={() => setSelected([])}>
            Unselect All
          </Button>
        ) : (
          <Button
            onClick={() =>
              setSelected(notifications.map((elem) => elem.spec))
            }
          >
            Select All
          </Button>
        )}
        <Button
          disabled={selected.length == 0}
          onClick={handleDelete}
        >
          Delete
        </Button>

        <Button disabled={selected.length == 0} onClick={handleView}>
          View
        </Button>
      </div>
      <div className={styles.notifications}>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={
              styles.notification +
              ' ' +
              (notification.new ? styles.new : '')
            }
          >
            <Checkbox
              checked={selected.includes(notification.spec)}
              onChange={onCheckboxCheck(notification)}
            />
            <div className={styles.titleWrapper}>
              <div className={styles.title}>{notification.title}</div>
              <div className={styles.shortDescription}>
                {notification.shortDescription}
              </div>
            </div>
            <div className={styles.author}>{notification.author}</div>
            <div className={styles.date}>
              {getLocalDate(notification.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

List.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default List;
