import { FC, memo, useCallback, useState, useEffect } from 'react';
import { Menu, Avatar, Indicator } from '@mantine/core';
import { useUser } from '@hooks/useUser';
import { useLocale } from '@hooks/useLocale';
import {
  errorNotification,
  newNotification,
  successNotification,
  infoNotification,
} from '@utils/notificationFunctions';
import { sendRequest } from '@requests/request';
import ReadModal from '@components/Notification/ReadModal/ReadModal';
import { INotification } from '@custom-types/data/atomic';

const ProfileMenu: FC<{}> = ({}) => {
  const { locale } = useLocale();
  const { user, signOut } = useUser();

  const [openedModal, setOpenedModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<INotification[]>(
    []
  );
  const [notificationAmount, setNotificationAmount] = useState(0);

  const fetchNotificationsAmount = useCallback(() => {
    sendRequest<undefined, number>(
      'notification/amount',
      'GET',
      undefined
    ).then((res) => {
      if (!res.error) {
        if (res.response > notificationAmount) {
          const id = newNotification({});
          infoNotification({
            id,
            title: locale.notify.notification.hasNew,
            message: locale.notify.notification.amount(res.response),
          });
          setNotificationAmount(res.response);
        }
      }
    });
  }, [notificationAmount, locale]);

  useEffect(() => {
    fetchNotificationsAmount();
  }, []); // eslint-disable-line

  useEffect(() => {
    const id = setInterval(fetchNotificationsAmount, 30000);
    return () => {
      clearInterval(id);
    };
  }, [fetchNotificationsAmount]);

  const handleSignOut = useCallback(() => {
    const id = newNotification({
      title: locale.notify.auth.signOut.loading,
      message: locale.loading + '...',
    });
    signOut().then((res) => {
      if (res) {
        successNotification({
          id,
          title: locale.notify.auth.signOut.success,
          autoClose: 5000,
        });
      } else {
        errorNotification({
          id,
          title: locale.notify.auth.signOut.error,
          autoClose: 5000,
        });
      }
    });
  }, [locale, signOut]);

  const fetchNotifications = useCallback(() => {
    setLoading(true);
    sendRequest<undefined, INotification[]>(
      'notification/new',
      'GET'
    ).then((res) => {
      console.log(res);
      if (!res.error) {
        setNotifications(res.response);
      }
      setLoading(false);
    });
  }, []);

  const handleOpenModal = useCallback(() => {
    fetchNotifications();
    setOpenedModal(true);
  }, [fetchNotifications]);

  return (
    <>
      <ReadModal
        opened={openedModal}
        close={() => setOpenedModal(false)}
        notifications={notifications}
        loading={loading}
      />
      <Menu
        trigger="hover"
        control={
          <Indicator
            size={24}
            label={
              notificationAmount > 99 ? '99+' : notificationAmount
            }
            disabled={notificationAmount == 0}
            styles={{
              indicator: {
                backgroundColor: 'var(--accent)',
                fontSize: 'var(--font-size-s)',
              },
            }}
          >
            <Avatar radius="xl" size="lg" color="white" />
          </Indicator>
        }
      >
        <Menu.Label>{user?.shortName || ''}</Menu.Label>
        <Menu.Item component="a" href="profile">
          {locale.mainHeaderLinks.signOut.profile}
        </Menu.Item>
        <Menu.Item onClick={handleOpenModal}>
          {locale.mainHeaderLinks.signOut.notifications}
        </Menu.Item>
        <Menu.Item onClick={handleSignOut}>
          {locale.mainHeaderLinks.signOut.signOut}
        </Menu.Item>
      </Menu>
    </>
  );
};

export default memo(ProfileMenu);
