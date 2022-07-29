import { INotification } from '@custom-types/data/atomic';
import { Button, Modal } from '@ui/basics';
import { FC, memo, useState, useMemo, useCallback } from 'react';
import styles from './readModal.module.css';
import { sendRequest } from '@requests/request';
import { Group, LoadingOverlay } from '@mantine/core';

const ReadModal: FC<{
  opened: boolean;
  close: () => void;
  notifications: INotification[];
  loading: boolean;
}> = ({ opened, close, notifications, loading }) => {
  const [current, setCurrent] = useState(0);
  const notification = useMemo(
    () => notifications[current],
    [notifications, current]
  );
  const [viewed, setViewed] = useState<string[]>([]);

  const prevOne = useCallback(() => {
    setCurrent((current) => (current > 0 ? current - 1 : current));
  }, []);

  const nextOne = useCallback(() => {
    setViewed((viewed) => {
      viewed.push(notifications[current].spec);
      return viewed;
    });
    setCurrent((current) =>
      current < notifications.length - 1 ? current + 1 : current
    );
  }, [notifications, current]);

  const sendViewed = useCallback(() => {
    if (viewed.length > 0) {
      sendRequest<string[], boolean>(
        'notification/viewed',
        'POST',
        Array.from(new Set(viewed))
      );
    }
  }, [viewed]);

  const handleClose = useCallback(() => {
    sendViewed();
    setCurrent(0);
    close();
  }, [close, sendViewed]);

  return (
    <div>
      <Modal
        overflow="inside"
        opened={opened}
        onClose={handleClose}
        size="80%"
        classNames={{
          root: styles.wrapper,
          body: styles.body,
        }}
        title={
          <div className={styles.TitleWrapper}>
            <div className={styles.title}>
              {notification ? notification.title : ''}
            </div>
            <div className={styles.author}>
              {notification ? notification.author : ''}
            </div>
          </div>
        }
      >
        <LoadingOverlay visible={loading} />
        {notification && (
          <>
            <div className={styles.shortDescription}>
              {notification.shortDescription}
            </div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: notification.description,
              }}
            />
          </>
        )}
        <Group position="center" mt="xl">
          <Button onClick={prevOne} disabled={current == 0}>
            Prev
          </Button>
          <Button
            onClick={nextOne}
            disabled={current >= notifications.length - 1}
          >
            Next
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default memo(ReadModal);
