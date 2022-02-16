import { useLocale } from '@hooks/useLocale';
import styles from './selector.module.css';
// import { Select, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';

const LanguageSelector: FC = () => {
  const { lang, langList, set } = useLocale();

  const router = useRouter();

  return (
    <>
      {/* <Select
        className={styles.selector}
        defaultValue={lang}
        value={lang}
        onChange={(e: any) => set(e.target.value)}
      >
        {langList.map((lang, index) => (
          <MenuItem className={styles.options} key={index} value={lang}>
            <Link href={router.asPath} locale={lang}>
              <a className={styles.link}>{lang.toUpperCase()}</a>
            </Link>
          </MenuItem>
        ))}
      </Select> */}
    </>
  );
};

export default memo(LanguageSelector);
