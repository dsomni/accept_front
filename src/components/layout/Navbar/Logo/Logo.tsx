import Image from 'next/legacy/image';
import logo from 'public/logo.svg';
import { FC, memo } from 'react';
import { useLocale } from '@hooks/useLocale';
import Link from 'next/link';
import styles from './logo.module.css';

const Logo: FC<{ hideText?: boolean }> = ({ hideText }) => {
  const { locale } = useLocale();
  return (
    <Link href="/" passHref className={styles.logoWrapper}>
      <Image src={logo} width={64} height={64} alt="Accept" />
      {!hideText && (
        <div className={styles.name}>{locale.accept}</div>
      )}
    </Link>
  );
};

export default memo(Logo);
