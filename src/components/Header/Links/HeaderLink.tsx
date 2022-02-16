import Link from 'next/link';
import React, { FC } from 'react';
import IHeaderLink from '@custom-types/IHeaderLink';
import styles from '../header.module.css';
import { useLocale } from '@hooks/useLocale';

export const HeaderLink: FC<{ link: IHeaderLink; current: string }> = ({
  link,
  current,
}) => {
  const { locale } = useLocale();
  return (
    <Link href={link.href}>
      <a
        className={styles.link}
        style={link.current(current) ? { fontWeight: '700' } : {}}
      >
        {link.text(locale)}
      </a>
    </Link>
  );
};
