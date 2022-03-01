import { FC, forwardRef, LegacyRef } from 'react';
import { List, Select } from '@mantine/core';
import styles from './languageSelector.module.css';
import { useLocale } from '@hooks/useLocale';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const LanguageSelector: FC = () => {
  const { lang, langList, set } = useLocale();
  const router = useRouter();

  const CreateSelectItem = (
    { value }: { value: string },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => (
    <div ref={ref}>
      <List.Item className={styles.options} value={value}>
        <Link href={router.asPath} locale={value}>
          <a className={styles.link}>{value.toUpperCase()}</a>
        </Link>
      </List.Item>
    </div>
  );
  const SelectItem = forwardRef(CreateSelectItem);

  const data = [
    {
      value: 'en',
    },
    {
      value: 'ru',
    },
  ];

  return (
    <>
      <Select
        className={styles.selector}
        defaultValue={lang}
        value={lang}
        onChange={(e: any) => set(e.target.value)}
        data={data}
        itemComponent={SelectItem}
      />
    </>
  );
};
