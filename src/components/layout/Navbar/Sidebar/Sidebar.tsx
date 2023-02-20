import { IHeaderLink } from '@custom-types/ui/IHeaderLink';
import { Burger, Drawer } from '@ui/basics';
import { FC, useState } from 'react';
import { Links } from './Links';
import Logo from '../Logo/Logo';
import SignIn from '../SignIn/SignIn';
import styles from './sideBar.module.css';

export const Sidebar: FC<{
  links: IHeaderLink[];
}> = ({ links }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.burgerWrapper}>
        <Burger opened={opened} onClick={() => setOpened(true)} />
        <Drawer opened={opened} onClose={() => setOpened(false)}>
          <Links links={links} />
        </Drawer>
      </div>
      <Logo hideText />
      <SignIn />
    </div>
  );
};
