import { FC, useState } from 'react';
import IHeaderLink from '@custom-types/IHeaderLink';
import { HeaderLink } from '../Header/Links/HeaderLink';
import Language from '../Header/LocationInfo/Language';
// import { Collapse, IconButton } from '@mui/material';
// import DehazeIcon from '@mui/icons-material/Dehaze';
import { useLocale } from '@hooks/useLocale';
import styles from './sideBar.module.css';
import { capitalize } from '@utils/capitalize';

export const Links: FC<{
  links: IHeaderLink[];
  dropdownLinks: IHeaderLink[];
  dropdownLabel: string;
  onClose: () => void;
  current: string;
}> = ({ links, dropdownLinks, dropdownLabel, onClose, current }) => {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();

  return (
    <>
      <div className={styles.top}>
        <div>
          {/* <IconButton color="inherit" onClick={() => onClose()}>
            <DehazeIcon fontSize={'large'} />
          </IconButton> */}
        </div>
        <div className={styles.CityLang}>
          <Language />
        </div>
      </div>
      <div className={styles.linkWrapper}>
        {links &&
          links.map((link, index) => (
            <div key={index}>
              <div style={{ margin: '30px 10%' }}>
                <HeaderLink link={link} current={current} />
              </div>
            </div>
          ))}
        <div
          className={styles.linkDiv}
          onClick={() => setOpen((open) => !open)}
        >
          {dropdownLabel}
        </div>
        {/* <Collapse in={open} timeout="auto" unmountOnExit>
          <div className={styles.linkWrapper}>
            {dropdownLinks.map((link, index) => (
              <div key={index}>
                <div style={{ margin: '30px 15%' }}>
                  <HeaderLink link={link} current={current} />
                </div>
              </div>
            ))}
          </div>
        </Collapse> */}
      </div>
    </>
  );
};
