import { FC, memo, useEffect, useState } from 'react';
import styles from './description.module.css';
import { ITournament } from '@custom-types/data/ITournament';
import { getLocalDate } from '@utils/datetime';
import { useLocale } from '@hooks/useLocale';
import PrimitiveTaskTable from '@ui/PrimitiveTaskTable/PrimitiveTaskTable';

const Description: FC<{ tournament: ITournament }> = ({
  tournament,
}) => {
  const { locale } = useLocale();
  const [startDate, setStartDate] = useState('-');
  const [endDate, setEndDate] = useState('-');

  useEffect(() => {
    setStartDate(getLocalDate(tournament.start));
    setEndDate(getLocalDate(tournament.end));
  }, [tournament.end, tournament.start]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{tournament.title}</div>
        <div className={styles.info}>
          <div className={styles.usersInfo}>
            <div className={styles.author}>
              {locale.tournament.form.author}: {tournament.author}
            </div>
          </div>

          <div>
            <div className={styles.duration}>
              {locale.tournament.form.startTime}: {startDate}
            </div>
            <div className={styles.duration}>
              {locale.tournament.form.endTime}: {endDate}
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: tournament.description }}
      />
      <div className={styles.tasksWrapper}>
        <PrimitiveTaskTable
          tasks={tournament.tasks}
          linkQuery={`tournament=${tournament.spec}`}
        />
      </div>
    </div>
  );
};

export default memo(Description);
