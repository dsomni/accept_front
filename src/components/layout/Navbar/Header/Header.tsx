import Logo from '../Logo/Logo';
import Links from './Links/Links';
import { IHeaderLink } from '@custom-types/ui/IHeaderLink';
import { FC, memo } from 'react';
import styles from './header.module.css';

const Header: FC<{
  links: IHeaderLink[];
}> = ({ links }) => {
  return (
    <div className={styles.header}>
      <Logo />
      <Links links={links} />
    </div>
  );
};

export default memo(Header);
