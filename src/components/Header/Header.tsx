import Logo from './Logo';
import Links from './Links/Links';
import LocationInfo from './LocationInfo/LocationInfo';
import IHeaderLink from '@custom-types/IHeaderLink';
import { FC, memo } from 'react';
import styles from './header.module.css';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';

const Header: FC<{
  links: IHeaderLink[];
  dropdown: IHeaderLink[];
  current: string;
}> = ({ links, dropdown, current }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.header}>
      <Logo fontSize={2.3} />
      <Links
        links={links}
        current={current}
        dropdownLinks={dropdown}
        dropdownLabel={capitalize(locale.mainHeaderLinks.projects)}
      />
      <LocationInfo />
    </div>
  );
};

export default memo(Header);
