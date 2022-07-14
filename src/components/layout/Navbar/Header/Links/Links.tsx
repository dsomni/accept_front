import { FC, memo } from 'react';
import IHeaderLink from '@custom-types/ui/IHeaderLink';
import { HeaderLink } from './HeaderLink';
import { Group } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import CustomDropdown from '@ui/CustomDropdown/CustomDropdown';
import { useLocale } from '@hooks/useLocale';
import styles from '../header.module.css';
import SignIn from '@components/layout/Navbar/SignIn/SignIn';

const Links: FC<{
  links: IHeaderLink[];
  dropdownLinks: IHeaderLink[];
}> = ({ links, dropdownLinks }) => {
  const { locale } = useLocale();

  return (
    <div>
      <Group position="right" spacing="xl">
        {links.map((link, index) => (
          <div key={index}>
            {link.text(locale) == 'dropdown' ? (
              <CustomDropdown
                links={dropdownLinks}
                label={capitalize(locale.mainHeaderLinks.projects)}
              />
            ) : (
              <HeaderLink
                link={link}
                propClass={styles.paddingLinks}
              />
            )}
          </div>
        ))}
        <SignIn />
      </Group>
    </div>
  );
};

export default memo(Links);
