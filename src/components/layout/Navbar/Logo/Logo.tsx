import Image from 'next/image';
import logo from 'public/logo.svg';
import { FC, memo } from 'react';
import { useLocale } from '@hooks/useLocale';
import Link from 'next/link';
import styles from './logo.module.css';

const Logo: FC = () => {
  const { locale } = useLocale();
  return (
    <Link href="/" passHref>
      <a className={styles.logoWrapper}>
        <Image src={logo} width={64} height={64} alt="Accept" />
        <div className={styles.name}>{locale.accept}</div>
      </a>
    </Link>
  );
};

export default memo(Logo);
