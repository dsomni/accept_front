import { NextPage, NextPageContext } from 'next';
import styles from '@styles/error.module.css';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import Link from 'next/link';

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <div className={styles.statusCode}>{statusCode}</div>
      <div className={styles.description}>
        {capitalize(locale.errorPage.description)}
      </div>
      <Link href="/">
        <a className={styles.return}>
          {capitalize(locale.errorPage.returnToMain)}
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
