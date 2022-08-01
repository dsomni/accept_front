import { INotification } from '@custom-types/data/notification';
import { Button, Modal } from '@ui/basics';
import {
  FC,
  memo,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import styles from './readModal.module.css';
import { Group, LoadingOverlay } from '@mantine/core';
import { useBackNotifications } from '@hooks/useBackNotifications';
import { useLocale } from '@hooks/useLocale';

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

  const { locale } = useLocale();

  const { sendViewed, fetchNotificationsAmount, loading } =
    useBackNotifications();

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
    sendViewed(viewed);
    setViewed([]);
    setTimeout(fetchNotificationsAmount, 500);
    setCurrent(0);
    close();
  }, [close, sendViewed, viewed, fetchNotificationsAmount]);

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
        }}
        title={
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              {notification ? notification.title : ''}
            </div>
            <div className={styles.author}>
              {locale.notification.form.author}:{' '}
              {notification ? notification.author : ''}
            </div>
          </div>
        }
        withCloseButton={false}
      >
        <LoadingOverlay visible={!notLoading && loading} />
        {notification && (
          <>
            <div
              className={styles.description}
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
