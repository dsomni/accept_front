import { FC, memo } from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@hooks/useLocale';
import { LanguageSelector } from '@components/LanguageSelector/LanguageSelector';

const Footer: FC = () => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <div>
        <LanguageSelector />
      </div>
      <div className={styles.githubs}>
        <div className={styles.github1}>
          <Link href="https://github.com/dsomni">
            <a>
              <Image
                src="/media/github.svg"
                alt="github icon"
                width={32}
                height={32}
              />
            </a>
          </Link>
        </div>
        <div className={styles.github2}>
          <Link href="https://github.com/RetroMeras">
            <a>
              <Image
                src="/media/github.svg"
                alt="github icon"
                width={32}
                height={32}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.copyright}>
        © {locale.credentials.startYear} - {new Date().getFullYear()}{' '}
        {locale.credentials.company}
      </div>
    </div>
  );
};

export default memo(Footer);
