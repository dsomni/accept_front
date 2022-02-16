import { FC, memo } from 'react';
import Header from '@components/Navbar/Header/Header';
import { links } from '@constants/MainHeaderLinks';
import { Sidebar } from '@components/Navbar/Sidebar/Sidebar';
import { useMediaQuery } from '@hooks/useMediaQuery';
import styles from './navbar.module.css';

const Navbar: FC = () => {
  const isBreakpoint = useMediaQuery(1080);
  return (
    <div className={styles.wrapper}>
      {isBreakpoint ? (
        <Sidebar links={links.main} dropdown={links.secondary} />
      ) : (
        <Header links={links.main} dropdown={links.secondary} />
      )}
    </div>
  );
};

export default memo(Navbar);
