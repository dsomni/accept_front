import { accessLevels } from '@constants/protectedRoutes';
import IHeaderLink from '@custom-types/ui/IHeaderLink';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import { Button, Menu } from '@mantine/core';
import { FC, memo } from 'react';
import styles from './customDropdown.module.css';

const CustomDropdown: FC<{ links: IHeaderLink[]; label: string }> = ({
  links,
  label,
}) => {
  const { locale } = useLocale();
  const { accessLevel } = useUser();

  return (
    <Menu position="bottom" zIndex={1000}>
      <Menu.Target>
        <Button className={styles.dropdownBth}>{label}</Button>
      </Menu.Target>
      <Menu.Dropdown>
        {links
          .filter(
            (item) =>
              !item.permission ||
              accessLevel > accessLevels[item.permission]
          )
          .map((link, index) => (
            <Menu.Item
              className={styles.items}
              key={index}
              component="a"
              href={link.href}
            >
              {link.text(locale)}
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default memo(CustomDropdown);
