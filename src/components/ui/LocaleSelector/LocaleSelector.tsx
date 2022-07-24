import { FC, memo } from 'react';
import styles from './localeSelector.module.css';
import { useLocale } from '@hooks/useLocale';
import { Language } from 'tabler-icons-react';
import { UnstyledButton } from '@mantine/core';

const LocaleSelector: FC = () => {
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

export default memo(LocaleSelector);
