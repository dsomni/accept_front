import styles from './customDropdown.module.css';
import { FC } from 'react';
import IHeaderLink from '@custom-types/IHeaderLink';
import { HeaderLink } from '../HeaderLink';
import { Menu } from '@components/Menu/Menu';

export const CustomDropdown: FC<{
  links: IHeaderLink[];
  current: string;
  label: string;
}> = ({ links, current, label }) => {
  return (
    <div>
      <Menu
        buttonText={label}
        buttonClass=""
        linksClass=""
        links={links.map((link, index) => (
          <span key={index} className={styles.menu}>
            <HeaderLink link={link} current={current} />
          </span>
        ))}
      />
    </div>
  );
};
