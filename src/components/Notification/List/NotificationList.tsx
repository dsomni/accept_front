import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './notificationList.module.css';
import { INotification } from '@custom-types/data/notification';
import { Badge, Pagination, Tooltip } from '@mantine/core';
import { Checkbox, Icon } from '@ui/basics';
import { requestWithError } from '@utils/requestWithError';
import { useLocale } from '@hooks/useLocale';
import { useRequest } from '@hooks/useRequest';
import { getLocalDate } from '@utils/datetime';
import { MailOpened, Trash } from 'tabler-icons-react';
import ReadModal from '@components/Notification/ReadModal/ReadModal';
import { useBackNotifications } from '@hooks/useBackNotifications';

const ON_PAGE = 10;

const NotificationList: FC<{}> = ({}) => {
  const [notifications, setNotifications] = useState<INotification[]>(
    []
  );
  const [openedModal, setOpenedModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [activePage, setPage] = useState(1);

  const displayedNotifications = useMemo(() => {
    return notifications.slice(
      ON_PAGE * (activePage - 1),
      ON_PAGE * activePage
    );
  }, [activePage, notifications]);

  const { locale, lang } = useLocale();

  const [selected, setSelected] = useState<string[]>([]);

  const { sendViewed, refetchNewNotifications } =
    useBackNotifications();

  const processNotifications = useCallback(
    (res: INotification[]) => {
      const notifications = res
        .map((item) => ({ ...item, date: new Date(item.date) }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());
      setNotifications(notifications);
    },
    [setNotifications]
  );

  const { refetch: refetchNotifications } = useRequest<
    {},
    INotification[],
    void
  >('notification/list', 'GET', undefined, processNotifications);

  const onCheckboxCheck = useCallback(
    (notification: INotification) => {
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
        setTimeout(refetchNewNotifications, 500);
        refetchNotifications();
      }
    );
  }, [
    locale,
    lang,
    refetchNotifications,
    refetchNewNotifications,
    selected,
    setSelected,
  ]);

  const handleView = useCallback(() => {
    sendViewed(
      selected,
      locale.notification.list.requestViewed,
      () => {
        setSelected([]);
        setTimeout(refetchNotifications, 500);
      }
    );
  }, [
    sendViewed,
    selected,
    locale.notification.list.requestViewed,
    refetchNotifications,
  ]);

  const handleOpenModal = useCallback(
    (index: number) => {
      setCurrent(index + ON_PAGE * (activePage - 1));
      setOpenedModal(true);
    },
    [activePage]
  );

  useEffect(() => {
    const id = setInterval(refetchNotifications, 15000);
    return () => {
      clearInterval(id);
    };
  }, [refetchNotifications]);

  const handleCloseModal = useCallback(() => {
    setOpenedModal(false);
    setTimeout(refetchNotifications, 500);
  }, [refetchNotifications]);

  const totalPages = useMemo(
    () => Math.max(Math.ceil(notifications.length / ON_PAGE), 1),
    [notifications.length]
  );

  const shouldShowPagination = useMemo(
    () => totalPages > 1,
    [totalPages]
  );

  useEffect(() => {
    setPage((activePage) => Math.min(activePage, totalPages));
  }, [totalPages]);

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
        {selected.length !== 0 ? (
          <>
            <Tooltip label={locale.notification.list.unselect}>
              <div>
                <Checkbox
                  checked={selected.length > 0}
                  indeterminate={
                    selected.length !== notifications.length
                  }
                  onChange={() => setSelected([])}
                />
              </div>
            </Tooltip>
            <div className={styles.lengthWrapper}>
              {selected.length}
            </div>
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
        ) : (
          <Tooltip label={locale.notification.list.selectAll}>
            <div>
              <Checkbox
                checked={false}
                onChange={() =>
                  setSelected(notifications.map((elem) => elem.spec))
                }
              />
            </div>
          </Tooltip>
        )}
      </div>
      <div
        className={styles.notifications}
        style={{ minHeight: `${55 * ON_PAGE}px` }}
      >
        {displayedNotifications.map((notification, index) => (
          <div
            key={index}
            className={
              styles.notification +
              ' ' +
              (!notification.viewed ? styles.new : '')
            }
          >
            <div className={styles.checkboxWrapper}>
              <Checkbox
                checked={selected.includes(notification.spec)}
                onChange={onCheckboxCheck(notification)}
              />
            </div>
            <div
              className={styles.notificationWrapper}
              onClick={() => handleOpenModal(index)}
            >
              <div className={styles.titleWrapper}>
                <div className={styles.title}>
                  {notification.title}{' '}
                  {!notification.viewed && (
                    <Badge color="green">{locale.new}</Badge>
                  )}
                </div>
                <div className={styles.shortDescription}>
                  {notification.shortDescription}
                </div>
              </div>
              <div className={styles.author}>
                {notification.author}
              </div>
              <div className={styles.date}>
                {getLocalDate(notification.date)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {shouldShowPagination && (
        <Pagination
          total={totalPages}
          position="center"
          page={activePage}
          onChange={setPage}
        />
      )}
    </div>
  );
};

export default memo(NotificationList);
