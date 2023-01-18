import { NextPage, NextPageContext } from 'next';
import styles from '@styles/error.module.css';
import { useLocale } from '@hooks/useLocale';

import Link from 'next/link';
import Title from '@ui/Title/Title';

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <Title title={statusCode?.toString() || locale.error} />
      <div className={styles.statusCode}>{statusCode}</div>
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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res
    ? res.statusCode
    : err
    ? err.statusCode
    : 404;
  return { statusCode };
};

export default Error;
