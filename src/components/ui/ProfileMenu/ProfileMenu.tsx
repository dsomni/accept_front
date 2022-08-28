import { FC, memo, useCallback } from 'react';
import { Menu, Avatar } from '@mantine/core';
import { useUser } from '@hooks/useUser';
import { useLocale } from '@hooks/useLocale';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';
import { useBackNotifications } from '@hooks/useBackNotifications';
import { link } from '@constants/Avatar';
import { Indicator } from '@ui/basics';

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
          <div>
            <Indicator
              label={amount > 99 ? '99+' : amount}
              disabled={amount <= 0}
            >
              <Avatar
                radius="lg"
                size="lg"
                src={user ? link(user.login) : undefined}
              />
            </Indicator>
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{user?.shortName || ''}</Menu.Label>
          <Menu.Item component="a" href="profile/me">
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
