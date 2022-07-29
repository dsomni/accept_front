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

const ProfileMenu: FC<{}> = ({}) => {
  const { locale } = useLocale();
  const { user, signOut } = useUser();

  const [notificationAmount, setNotificationAmount] = useState(0);

  const fetchNotifications = useCallback(() => {
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
    fetchNotifications();
  }, []); // eslint-disable-line

  useEffect(() => {
    const id = setInterval(fetchNotifications, 30000);
    return () => {
      clearInterval(id);
    };
  }, [fetchNotifications]);

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

  return (
    <Menu
      trigger="hover"
      control={
        <Indicator
          size={24}
          label={notificationAmount > 99 ? '99+' : notificationAmount}
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
      <Menu.Item component="a" href="profile/notifications">
        {locale.mainHeaderLinks.signOut.notifications}
      </Menu.Item>
      <Menu.Item onClick={handleSignOut}>
        {locale.mainHeaderLinks.signOut.signOut}
      </Menu.Item>
    </Menu>
  );
};

export default memo(ProfileMenu);
