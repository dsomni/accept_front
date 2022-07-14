import { FC, memo } from 'react';
import styles from './description.module.css';
import { ITournamentCreate } from '@custom-types/data/ITournament';

const Description: FC<{ tournament: ITournamentCreate }> = ({
  tournament,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{tournament.title}</div>
      <div className={styles.author}>{tournament.author}</div>
      <div className={styles.description}>
        {tournament.description}
      </div>
      <div className={styles.start}>{tournament.start}</div>
      <div className={styles.end}>{tournament.end}</div>
    </div>
  );
};

export default memo(Description);
