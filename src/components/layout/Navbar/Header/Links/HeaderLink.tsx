import React, { FC } from 'react';
import IHeaderLink from '@custom-types/ui/IHeaderLink';
import { useLocale } from '@hooks/useLocale';
import Dropdown from './Dropdown';
import { accessLevels } from '@constants/protectedRoutes';
import { Button } from '@ui/basics';
import { useUser } from '@hooks/useUser';

export const HeaderLink: FC<{
  link: IHeaderLink;
  additionalClass?: string;
}> = ({ link, additionalClass }) => {
  const { locale } = useLocale();

  const { accessLevel } = useUser();
  return (
    <div className={additionalClass}>
      {link.type == 'dropdown' && link.links ? (
        <Dropdown
          items={link.links
            .filter(
              (item) =>
                !item.permission ||
                accessLevel > accessLevels[item.permission]
            )
            .map((dropdownLink) => ({
              href: dropdownLink.href,
              label: dropdownLink.text(locale),
            }))}
        >
          <Button kind="header" onClick={() => {}}>
            {link.text(locale)}
          </Button>
        </Dropdown>
      ) : (
        (!link.permission ||
          accessLevel > accessLevels[link.permission]) && (
          <Button kind="header" href={link.href}>
            {link.text(locale)}
          </Button>
        )
      )}
    </div>
  );
};
