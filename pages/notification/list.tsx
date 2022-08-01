import { useState, ReactNode, useCallback, ChangeEvent } from 'react';
import { DefaultLayout } from '@layouts/DefaultLayout';
import styles from '@styles/notification/list.module.css';
import {
  INotification,
  INotificationRecord,
} from '@custom-types/data/notification';
import { Checkbox } from '@mantine/core';
import { Icon } from '@ui/basics';
import { requestWithError } from '@utils/requestWithError';
import { useLocale } from '@hooks/useLocale';
import { useRequest } from '@hooks/useRequest';
import { getLocalDate } from '@utils/datetime';
import { MailOpened, Trash } from 'tabler-icons-react';
import ReadModal from '@components/Notification/ReadModal/ReadModal';

interface INotificationItem extends INotification {
  new: boolean;
}

function List() {
  const [notifications, setNotifications] = useState<
    INotificationItem[]
  >([]);
  const [openedModal, setOpenedModal] = useState(false);
  const [current, setCurrent] = useState(0);

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
    requestWithError<string[], boolean>(
      'notification/delete',
      'POST',
      locale.notification.list.requestDelete,
      lang,
      selected,
      () => {
        setSelected([]);
        refetchNotifications();
      }
    );
  }, [locale, lang, refetchNotifications, selected, setSelected]);

  const handleView = useCallback(() => {
    requestWithError<string[], boolean>(
      'notification/viewed',
      'POST',
      locale.notification.list.requestViewed,
      lang,
      selected,
      () => {
        setSelected([]);
        setTimeout(refetchNotifications, 500);
      }
    );
  }, [locale, lang, refetchNotifications, selected, setSelected]);

  const handleOpenModal = useCallback((current: number) => {
    return () => {
      setCurrent(current);
      setOpenedModal(true);
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenedModal(false);
    setTimeout(refetchNotifications, 500);
  }, [refetchNotifications]);

  return (
    <div className={styles.wrapper}>
      <ReadModal
        opened={openedModal}
        defaultSelected={current}
        notifications={notifications}
        notLoading
        close={handleCloseModal}
      />
      <div className={styles.utils}>
        <div className={styles.selectAll}>
          {selected.length == notifications.length &&
          selected.length !== 0 ? (
            <Icon
              size="xs"
              tooltipLabel={locale.notification.list.unselect}
              onClick={() => setSelected([])}
            >
              <Checkbox checked />
            </Icon>
          ) : (
            <Icon
              size="xs"
              tooltipLabel={locale.notification.list.selectAll}
              onClick={() =>
                setSelected(notifications.map((elem) => elem.spec))
              }
            >
              <Checkbox />
            </Icon>
          )}
        </div>
        {selected.length !== 0 && (
          <>
            <Icon
              size="xs"
              tooltipLabel={locale.notification.list.delete}
              onClick={handleDelete}
            >
              <Trash />
            </Icon>

            <Icon
              size="xs"
              tooltipLabel={locale.notification.list.viewed}
              onClick={handleView}
            >
              <MailOpened />
            </Icon>
          </>
        )}
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
            <div className={styles.checkboxWrapper}>
              <Checkbox
                checked={selected.includes(notification.spec)}
                onChange={onCheckboxCheck(notification)}
              />
            </div>
            <div
              className={styles.titleWrapper}
              onClick={handleOpenModal(index)}
            >
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
