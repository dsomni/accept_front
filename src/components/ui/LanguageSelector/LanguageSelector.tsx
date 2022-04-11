import { FC, forwardRef } from 'react';
import styles from './languageSelector.module.css';
import { useLocale } from '@hooks/useLocale';
import { List, ListItem, Select } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const LanguageSelector: FC = () => {
  const { lang, set } = useLocale();
  const router = useRouter();

  const nextLang = lang === 'ru' ? 'en' : 'ru';

  return (
    <>
      <Link href={router.asPath} locale={nextLang}>
        <a
          onClick={() => {
            set(nextLang);
          }}
          className={styles.lang}
        >
          {nextLang.toUpperCase()}
        </a>
      </Link>
    </>
  );
};
