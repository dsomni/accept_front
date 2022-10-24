import { INotification } from '@custom-types/data/notification';
import { Button, Modal } from '@ui/basics';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './readModal.module.css';
import { Group, LoadingOverlay } from '@mantine/core';
import { useBackNotifications } from '@hooks/useBackNotifications';
import { useLocale } from '@hooks/useLocale';
import { getLocalDate } from '@utils/datetime';

const ReadModal: FC<{
  opened: boolean;
  notifications: INotification[];
  defaultSelected?: number;
  notLoading?: boolean;
  close: () => void;
}> = ({
  opened,
  notifications,
  defaultSelected,
  notLoading,
  close,
}) => {
  const [current, setCurrent] = useState(
    defaultSelected ? defaultSelected : 0
  );

  const [viewed, setViewed] = useState<string[]>([]);

  useEffect(() => {
    setCurrent(defaultSelected || 0);
    setViewed([]);
  }, [defaultSelected]);

  const { locale } = useLocale();

  const { sendViewed, loading } = useBackNotifications();

  const notification = useMemo(
    () => notifications[current],
    [notifications, current]
  );

  useEffect(() => {
    if (notifications[current])
      setViewed((viewed) => {
        viewed.push(notifications[current].spec);
        return viewed;
      });
  }, [notifications, current, setViewed]);

  const prevOne = useCallback(() => {
    setCurrent((current) => (current > 0 ? current - 1 : current));
  }, []);

  const nextOne = useCallback(() => {
    setCurrent((current) =>
      current < notifications.length - 1 ? current + 1 : current
    );
  }, [notifications]);

  const handleClose = useCallback(() => {
    sendViewed(viewed, locale.notification.list.requestViewed, () =>
      setViewed([])
    );
    close();
  }, [close, locale, sendViewed, viewed]);

  return (
    <div>
      <Modal
        overflow="inside"
        opened={opened}
        onClose={handleClose}
        size="80%"
        overlayBlur={3}
        classNames={{
          root: styles.wrapper,
          body: styles.body,
          title: styles.titleWrapper,
        }}
        title={
          <>
            {notification ? (
              <div>
                <div className={styles.title}>
                  {notification.title}
                  <span className={styles.paging}>
                    {current + 1}/{notifications.length}
                  </span>
                </div>
                <div className={styles.author}>
                  {locale.notification.form.author}:{' '}
                  {notification.author}
                </div>
                <div className={styles.date}>
                  {getLocalDate(notification.date)}
                </div>
              </div>
            ) : (
              <div className={styles.seeProfileWrapper}>
                {locale.notification.seeProfile.map((par, index) => (
                  <p key={index}>{par}</p>
                ))}
              </div>
            )}
          </>
        }
        withCloseButton={false}
      >
        <LoadingOverlay visible={!notLoading && loading} />
        {notification && (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: notification.description,
              }}
            />
          </>
        )}
        <Group position="center" mt="xl" pb="md">
          {!(current == 0) && (
            <Button variant="light" onClick={prevOne}>
              {locale.form.back}
            </Button>
          )}
          {!(current >= notifications.length - 1) && (
            <Button onClick={nextOne} variant="light">
              {locale.form.next}
            </Button>
          )}
        </Group>
      </Modal>
    </div>
  );
};

export default memo(ReadModal);
