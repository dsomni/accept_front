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
    <Menu position="bottom">
      <Menu.Target>
        <Button className={styles.dropdownBth}>{label}</Button>
      </Menu.Target>
      <Menu.Dropdown>
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
      </Menu.Dropdown>
    </Menu>
  );
};

export default memo(CustomDropdown);
