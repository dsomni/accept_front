import { FC } from 'react';
import { IHeaderLink } from '@custom-types/ui/IHeaderLink';
import { NavLink } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { accessLevels } from '@constants/protectedRoutes';
import { useUser } from '@hooks/useUser';

export const Links: FC<{
  links: IHeaderLink[];
}> = ({ links }) => {
  const { locale } = useLocale();

  const { accessLevel } = useUser();

  return (
    <div>
      {links
        .filter(
          (item) =>
            !item.permission ||
            accessLevel >= accessLevels[item.permission]
        )
        .map((link, index) => (
          <NavLink
            key={index}
            label={link.text(locale)}
            component={link.type !== 'dropdown' ? 'a' : 'button'}
            href={link.type !== 'dropdown' ? link.href : undefined}
            opened={true}
            rightSection={<></>}
          >
            {link.links &&
              link.links
                .filter(
                  (item) =>
                    !item.permission ||
                    accessLevel >= accessLevels[item.permission]
                )
                .map((sublink, subindex) => (
                  <NavLink
                    key={subindex}
                    label={sublink.text(locale)}
                    component={
                      sublink.type !== 'dropdown' ? 'a' : 'button'
                    }
                    href={
                      sublink.type !== 'dropdown'
                        ? sublink.href
                        : undefined
                    }
                  />
                ))}
          </NavLink>
        ))}
    </div>
  );
};
