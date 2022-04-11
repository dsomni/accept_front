import Link from 'next/link';
import React, { FC } from 'react';
import IHeaderLink from '@custom-types/IHeaderLink';
import styles from '../header.module.css';
import { useLocale } from '@hooks/useLocale';

export const HeaderLink: FC<{
  link: IHeaderLink;
  propClass?: string;
}> = ({ link, propClass }) => {
  const { locale } = useLocale();
  return (
    <Link href={link.href}>
      <a className={styles.link + ' ' + propClass}>
        {link.text(locale)}
      </a>
    </Link>
  );
};
