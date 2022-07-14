import Logo from '../Logo/Logo';
import Links from './Links/Links';
import IHeaderLink from '@custom-types/ui/IHeaderLink';
import { FC, memo } from 'react';
import styles from './header.module.css';

const Header: FC<{
  links: IHeaderLink[];
  dropdown: IHeaderLink[];
}> = ({ links, dropdown }) => {
  return (
    <div className={styles.header}>
      <Logo />
      <Links links={links} dropdownLinks={dropdown} />
    </div>
  );
};

export default memo(Header);
