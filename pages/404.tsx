import { NextPage } from 'next';
import styles from '@styles/error.module.css';
import { useLocale } from '@hooks/useLocale';

import Link from 'next/link';
import Title from '@ui/Title/Title';

const Error: NextPage = () => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <Title title={'404'} />
      <div className={styles.statusCode}>{404}</div>
      <div className={styles.description}>
        {locale.errorPage.description}
      </div>
      <Link href="/">
        <a className={styles.return}>
          {locale.errorPage.returnToMain}
        </a>
      </Link>
    </div>
  );
};
export default Error;
