import { FC, memo } from 'react';
import Header from '@components/layout/Navbar/Header/Header';
import { links } from '@constants/MainHeaderLinks';
import { Sidebar } from '@components/layout/Navbar/Sidebar/Sidebar';
import { useMediaQuery } from '@hooks/useMediaQuery';
import styles from './navbar.module.css';

const Navbar: FC = () => {
  const isBreakpoint = useMediaQuery(800);
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
