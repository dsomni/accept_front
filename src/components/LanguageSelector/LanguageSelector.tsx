import { FC } from 'react';
import styles from './languageSelector.module.css';
import { useLocale } from '@hooks/useLocale';
import { Select } from '@mantine/core';

export const LanguageSelector: FC = () => {
  const { lang, langList, set } = useLocale();

  return (
    <>
      <Select
        classNames={{ input: styles.input }}
        defaultValue={lang}
        value={lang}
        onChange={(e: any) => set(e)}
        data={langList.map((lang) => {
          return { value: lang, label: lang.toUpperCase() };
        })}
      />
    </>
  );
};
