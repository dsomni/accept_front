import IHeaderLink from '@custom-types/IHeaderLink';
import { FC, useState } from 'react';
// import { IconButton, Drawer } from '@mui/material';
// import DehazeIcon from '@mui/icons-material/Dehaze';
import { Links } from './Links';
import Logo from '../Header/Logo';
import styles from './sideBar.module.css';

export const Sidebar: FC<{
  links: IHeaderLink[];
  dropdown: IHeaderLink[];
  current: string;
}> = ({ links, dropdown, current }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.sideBarWrapper}>
      {/* <span className={styles.burger}>
        <IconButton color="inherit" onClick={() => setOpen(true)}>
          <DehazeIcon fontSize={'large'} />
        </IconButton>
      </span>
      <div className={styles.logoWrapper}>
        <Logo fontSize={2.5} />
      </div>
      <Drawer
        anchor={'top'}
        open={open}
        onClose={() => setOpen(false)}
        variant={'temporary'}
      >
        <Links
          links={links}
          more={dropdown}
          onClose={() => setOpen(false)}
          current={current}
        />
      </Drawer> */}
    </div>
  );
};
