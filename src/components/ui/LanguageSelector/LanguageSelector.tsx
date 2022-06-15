import { FC } from 'react';
import styles from './languageSelector.module.css';
import { useLocale } from '@hooks/useLocale';
import { Language } from 'tabler-icons-react';
import { UnstyledButton } from '@mantine/core';

export const LanguageSelector: FC = () => {
  const { lang, set } = useLocale();
  const nextLang = lang === 'ru' ? 'en' : 'ru';

  return (
    <>
      <UnstyledButton
        onClick={() => {
          set(nextLang);
        }}
      >
        <div className={styles.wrapper}>
          <Language color={'white'} />
          {nextLang.toUpperCase()}
        </div>
      </UnstyledButton>
    </>
  );
};
