import { HeaderLink } from '@components/layout/Navbar/Header/Links/HeaderLink';
import IHeaderLink from '@custom-types/ui/IHeaderLink';
import { useLocale } from '@hooks/useLocale';
import { Button, Menu } from '@mantine/core';
import { FC, memo } from 'react';
import styles from './customDropdown.module.css';

const CustomDropdown: FC<{ links: IHeaderLink[]; label: string }> = ({
  links,
  label,
}) => {
  const { locale } = useLocale();

  return (
    <Menu
      position="bottom"
      gutter={19}
      control={
        <Button className={styles.dropdownBth}>{label}</Button>
      }
    >
      {links.map((link, index) => (
        <Menu.Item
          className={styles.items}
          key={index}
          component="a"
          href={link.href}
        >
          {link.text(locale)}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default memo(CustomDropdown);
