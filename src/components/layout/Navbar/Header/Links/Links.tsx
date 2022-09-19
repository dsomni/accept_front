import { FC, memo } from 'react';
import IHeaderLink from '@custom-types/ui/IHeaderLink';
import { HeaderLink } from './HeaderLink';
import { Group } from '@mantine/core';

import CustomDropdown from '@ui/CustomDropdown/CustomDropdown';
import { useLocale } from '@hooks/useLocale';
import styles from '../header.module.css';
import SignIn from '@components/layout/Navbar/SignIn/SignIn';

const Links: FC<{
  links: IHeaderLink[];
}> = ({ links }) => {
  const { locale } = useLocale();

  return (
    <div>
      <Group position="right" spacing="xl">
        {links.map((link, index) => (
          <div key={index}>
            {link.type == 'dropdown' ? (
              <CustomDropdown
                links={link?.links || []}
                label={link.text(locale)}
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
