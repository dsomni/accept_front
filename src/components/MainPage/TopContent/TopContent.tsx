import { FC, memo } from 'react';
import { useLocale } from '@hooks/useLocale';
import styles from './topContent.module.css';
import { capitalize } from '@utils/capitalize';
import packageInfo from 'package.json';

const version = packageInfo.version;

const TopContent: FC = () => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{capitalize(locale.accept)}</div>
        <div className={styles.version}>{version}</div>
      </div>
    </div>
  );
};

export default memo(TopContent);
