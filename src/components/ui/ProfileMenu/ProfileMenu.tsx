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
import styles from './profileMenu.module.scss';
import { Logout } from 'tabler-icons-react';
import { accessLevels } from '@constants/protectedRoutes';
import { menuLinks } from '@constants/ProfileMenuLinks';
import { useWidth } from '@hooks/useWidth';

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

  const { tabletLandscapeUp } = useWidth();

  return (
    <>
      <Menu
        trigger={tabletLandscapeUp ? 'hover' : 'click'}
        zIndex={1000}
        position={tabletLandscapeUp ? undefined : 'bottom-end'}
        offset={tabletLandscapeUp ? undefined : 12}
      >
        <Menu.Target>
          <div>
            <Indicator label={new_amount} disabled={new_amount <= 0}>
              <Avatar
                radius="lg"
                size="lg"
                src={user ? link(user.login) : undefined}
                alt={'Users avatar'}
              />
            </Indicator>
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label className={styles.label}>
            {user?.shortName || ''}
          </Menu.Label>
          {menuLinks
            .filter(
              (item) =>
                !item.permission ||
                accessLevel >= accessLevels[item.permission]
            )
            .map((item, index) => (
              <Menu.Item component="a" href={item.href} key={index}>
                <Group spacing="xs" className={styles.wrapper}>
                  {item.icon}
                  <div>{item.text(locale)}</div>
                </Group>
              </Menu.Item>
            ))}
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
