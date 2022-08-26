import { FC, memo, useCallback } from 'react';
import { Avatar, Indicator, Menu } from '@mantine/core';
import { useUser } from '@hooks/useUser';
import { useLocale } from '@hooks/useLocale';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';
import { useBackNotifications } from '@hooks/useBackNotifications';

const ProfileMenu: FC<{}> = ({}) => {
  const { locale } = useLocale();
  const { user, signOut } = useUser();

  const { amount, openModal } = useBackNotifications();

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
    <>
      <Menu trigger="hover">
        <Menu.Target>
          <Indicator
            size={24}
            label={amount > 99 ? '99+' : amount}
            disabled={amount <= 0}
            styles={{
              indicator: {
                backgroundColor: 'var(--accent)',
                fontSize: 'var(--font-size-s)',
              },
            }}
          >
            <Avatar radius="xl" size="lg" color="white" />
          </Indicator>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{user?.shortName || ''}</Menu.Label>
          <Menu.Item component="a" href="profile">
            {locale.mainHeaderLinks.signOut.profile}
          </Menu.Item>
          <Menu.Item onClick={openModal}>
            {locale.mainHeaderLinks.signOut.notifications}
          </Menu.Item>
          <Menu.Item onClick={handleSignOut}>
            {locale.mainHeaderLinks.signOut.signOut}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default memo(ProfileMenu);
