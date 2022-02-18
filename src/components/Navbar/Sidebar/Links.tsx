import { FC, useState } from 'react';
import IHeaderLink from '@custom-types/IHeaderLink';
import { HeaderLink } from '../Header/Links/HeaderLink';
import { useLocale } from '@hooks/useLocale';
import styles from './sideBar.module.css';
import { Burger, Group } from '@mantine/core';
import SignIn from '../SignIn/SignIn';

export const Links: FC<{
  links: IHeaderLink[];
  dropdownLinks: IHeaderLink[];
  dropdownLabel: string;
  onClose: () => void;
}> = ({ links, dropdownLinks, dropdownLabel, onClose }) => {
  const [openCollapse, setOpenCollapse] = useState(false);

  const { locale } = useLocale();

  return (
    <>
      <Burger className={styles.burger} opened={true} onClick={onClose} />
      <Group direction="column" className={styles.linkWrapper}>
        <SignIn />
        {links.map((link, index) => (
          <div key={index}>
            {link.text(locale) == 'dropdown' ? (
              <>
                <div
                  className={styles.linkDiv}
                  onClick={() => setOpenCollapse((open) => !open)}
                >
                  {dropdownLabel}
                </div>
                <div
                  className={styles.collapse}
                  style={{ display: openCollapse ? 'block' : 'none' }}
                >
                  {dropdownLinks &&
                    dropdownLinks.map((link, index) => (
                      <div key={index}>
                        <div style={{ margin: '30px 10%' }}>
                          <HeaderLink
                            link={link}
                            propClass={styles.noHoverLink}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <HeaderLink link={link} propClass={styles.noHoverLink} />
            )}
          </div>
        ))}
      </Group>
    </>
  );
};
