import { FC, memo, useCallback } from 'react';
import { Avatar, Group, Menu } from '@mantine/core';
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
import styles from './profileMenu.module.css';
import {
  BellRinging,
  Crown,
  Logout,
  Robot,
} from 'tabler-icons-react';
import { accessLevels } from '@constants/protectedRoutes';

const ProfileMenu: FC<{}> = ({}) => {
  const { locale } = useLocale();
  const { user, signOut, accessLevel } = useUser();

  const { new_amount } = useBackNotifications();

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
      <Menu trigger="hover" zIndex={1000}>
        <Menu.Target>
          <div>
            <Indicator label={new_amount} disabled={new_amount <= 0}>
              <Avatar
                radius="lg"
                size="lg"
                src={user ? link(user.login) : undefined}
              />
            </Indicator>
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label className={styles.label}>
            {user?.shortName || ''}
          </Menu.Label>
          <Menu.Item component="a" href="/profile/me">
            <Group spacing="xs" className={styles.wrapper}>
              <Robot color="var(--secondary)" size={20} />
              <div>{locale.mainHeaderLinks.profileLinks.profile}</div>
            </Group>
          </Menu.Item>
          <Menu.Item
            component="a"
            href="/profile/me?section=notifications"
          >
            <Group spacing="xs" className={styles.wrapper}>
              <Group className={styles.wrapper}>
                <Indicator disabled={new_amount <= 0} size={6}>
                  <BellRinging color="var(--secondary)" size={20} />
                </Indicator>
                <div>
                  {locale.mainHeaderLinks.profileLinks.notifications}
                </div>
              </Group>
            </Group>
          </Menu.Item>
          {accessLevel >= accessLevels.admin && (
            <Menu.Item component="a" href="/dashboard/admin">
              <Group spacing="xs" className={styles.wrapper}>
                <Crown color="var(--secondary)" size={20} />
                <div>
                  {locale.mainHeaderLinks.profileLinks.adminDashboard}
                </div>
              </Group>
            </Menu.Item>
          )}
          <Menu.Item onClick={handleSignOut}>
            <Group spacing="xs" className={styles.wrapper}>
              <Group className={styles.wrapper}>
                <Logout color="var(--secondary)" size={20} />
                <div>
                  {locale.mainHeaderLinks.profileLinks.signOut}
                </div>
              </Group>
            </Group>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default memo(ProfileMenu);
