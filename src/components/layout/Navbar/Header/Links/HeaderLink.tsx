import Link from 'next/link';
import React, { FC } from 'react';
import IHeaderLink from '@custom-types/ui/IHeaderLink';
import styles from '../header.module.css';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import { accessLevels } from '@constants/protectedRoutes';

export const HeaderLink: FC<{
  link: IHeaderLink;
  propClass?: string;
}> = ({ link, propClass }) => {
  const { locale } = useLocale();
  const { accessLevel } = useUser();
  return (
    <>
      {(!link.permission ||
        accessLevel > accessLevels[link.permission]) && (
        <Link href={link.href}>
          <a className={styles.link + ' ' + propClass}>
            {link.text(locale)}
          </a>
        </Link>
      )}
    </>
  );
};
