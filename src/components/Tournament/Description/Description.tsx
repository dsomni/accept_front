import { FC, memo, useEffect, useState } from 'react';
import styles from './description.module.css';
import { ITournament } from '@custom-types/data/ITournament';
import { getLocalDate } from '@utils/datetime';
import { useLocale } from '@hooks/useLocale';
import { ITaskDisplay } from '@custom-types/data/ITask';
import { sendRequest } from '@requests/request';
import PrimitiveTaskTable from '@ui/PrimitiveTaskTable/PrimitiveTaskTable';

const Description: FC<{ tournament: ITournament }> = ({
  tournament,
}) => {
  const { locale } = useLocale();
  const [startDate, setStartDate] = useState('-');
  const [endDate, setEndDate] = useState('-');

  const [tasks, setTasks] = useState(tournament.tasks);

  useEffect(() => {
    setStartDate(getLocalDate(tournament.start));
    setEndDate(getLocalDate(tournament.end));
  }, [tournament.end, tournament.start]);

  useEffect(() => {
    let cleanUp = false;
    if (tournament.tasks.length) {
      sendRequest<string[], ITaskDisplay[]>(
        'task/list-specs',
        'POST',
        tournament.tasks.map((task: any) => task.value || task.spec),
        5000
      ).then((res) => {
        if (!cleanUp && !res.error) {
          setTasks(res.response);
        }
      });
    }
    return () => {
      cleanUp = true;
    };
  }, [tournament.tasks]);

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
          tasks={tasks}
          linkQuery={`tournament=${tournament.spec}`}
        />
      </div>
    </div>
  );
};

export default memo(Description);
