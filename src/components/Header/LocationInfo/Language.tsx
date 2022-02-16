// import LanguageIcon from '@mui/icons-material/Language';
import LanguageSelector from './LanguageSelector';
import styles from './language.module.css';

export default function Language() {
  return (
    <div className={styles.lang}>
      {/* <LanguageIcon fontSize={'medium'} /> */}
      <LanguageSelector />
    </div>
  );
}
