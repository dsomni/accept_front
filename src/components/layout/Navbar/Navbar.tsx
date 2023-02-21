import { FC, memo } from 'react';
import Header from '@components/layout/Navbar/Header/Header';
import { links } from '@constants/MainHeaderLinks';
import { Sidebar } from './Sidebar/Sidebar';
import styles from './navbar.module.css';
import { useWidth } from '@hooks/useWidth';

const Navbar: FC = () => {
  const { tabletLandscapeUp } = useWidth();

  return (
    <div className={styles.wrapper}>
      {tabletLandscapeUp ? (
        <Header links={links} />
      ) : (
        <Sidebar links={links} />
      )}
    </div>
  );
};

export default memo(Navbar);
