import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './description.module.css';
import { ITournament } from '@custom-types/data/ITournament';
import { ITaskDisplay } from '@custom-types/data/ITask';
import { getLocalDate } from '@utils/datetime';
import { useLocale } from '@hooks/useLocale';
import PrimitiveTaskTable from '@ui/PrimitiveTaskTable/PrimitiveTaskTable';
import { useUser } from '@hooks/useUser';
import { Helper } from '@ui/basics';
import { requestWithNotify } from '@utils/requestWithNotify';
import { Icon } from '@ui/basics';
import { AlertCircle } from 'tabler-icons-react';
import { sendRequest } from '@requests/request';

const Description: FC<{
  tournament: ITournament;
  isPreview?: boolean;
}> = ({ tournament, isPreview }) => {
  const { locale, lang } = useLocale();
  const [startDate, setStartDate] = useState('-');
  const [endDate, setEndDate] = useState('-');
  const [tasks, setTasks] = useState(tournament.tasks);

  const { user, isAdmin } = useUser();

  const [successfullyRegistered, setSuccessfullyRegistered] =
    useState(false);

  const special = useMemo(
    () =>
      isAdmin ||
      tournament.moderators.includes(user?.login || '') ||
      tournament.author == user?.login,
    [isAdmin, tournament.author, tournament.moderators, user?.login]
  );

  useEffect(() => {
    let cleanUp = false;
    if (tournament.tasks.length && !isPreview) {
      sendRequest<undefined, ITaskDisplay[]>(
        `tournament/tasks/${tournament.spec}`,
        'GET',
        undefined,
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
  }, [tournament.spec, tournament.tasks, isPreview]);

  const registered = useMemo(
    () =>
      special ||
      successfullyRegistered ||
      tournament.participants.includes(user?.login || ''),
    [user?.login, special, tournament, successfullyRegistered]
  );

  const handleRegistration = useCallback(() => {
    requestWithNotify<{}, boolean>(
      `tournament/register/${tournament.spec}`,
      'GET',
      locale.notify.tournament.registration,
      lang,
      () => '',
      undefined,
      () => setSuccessfullyRegistered(true)
    );
  }, [locale, lang, tournament.spec]);

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
      {!registered &&
        !(tournament.status.spec === 2) &&
        (tournament.status.spec === 0 ||
          tournament.allowRegistrationAfterStart) && (
          <div className={styles.registrationWrapper}>
            <div
              onClick={handleRegistration}
              className={styles.register}
            >
              {locale.tournament.register}
            </div>
            <Helper
              dropdownContent={
                <div>
                  {locale.helpers.tournament.registration.map(
                    (p, idx) => (
                      <p key={idx}>{p}</p>
                    )
                  )}
                </div>
              }
            />
            {!tournament.allowRegistrationAfterStart && (
              <Helper
                dropdownContent={
                  <div>
                    {locale.helpers.tournament.registrationWarning.map(
                      (p, idx) => (
                        <p key={idx}>{p}</p>
                      )
                    )}
                  </div>
                }
                customIcon={
                  <Icon size="xs">
                    <AlertCircle color={'var(--negative)'} />
                  </Icon>
                }
              />
            )}
          </div>
        )}
      <div className={styles.tasksWrapper}>
        <PrimitiveTaskTable
          tasks={tasks}
          linkQuery={`tournament=${tournament.spec}`}
          empty={
            !special || isPreview
              ? registered
                ? locale.tournament.emptyTasks
                : locale.tournament.needRegistration
              : locale.tournament.addTasks
          }
        />
      </div>
    </div>
  );
};

export default memo(Description);
