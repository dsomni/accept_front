import { FC, memo, useCallback, useState } from 'react';
import { ITableColumn } from '@custom-types/ui/ITable';

import tableStyles from '@styles/ui/customTable.module.css';
import { ILocale } from '@custom-types/ui/ILocale';
import { capitalize } from '@utils/capitalize';
import UserList, { IParticipant } from '@ui/UserList/UserList';

import styles from './participantsList.module.css';
import { useLocale } from '@hooks/useLocale';
import Link from 'next/link';
import { Button } from '@ui/basics';
import { requestWithNotify } from '@utils/requestWithNotify';

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: locale.users.list.login,
    key: 'login',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.login.value > b.login.value
        ? 1
        : a.login.value == b.login.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 8,
  },
  {
    label: locale.users.list.shortName,
    key: 'shortName',
    sortable: true,
    sortFunction: (a: any, b: any) => {
      return a.shortName.value > b.shortName.value
        ? 1
        : a.shortName.value == b.shortName.value
        ? 0
        : -1;
    },
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 3,
  },
  {
    label: locale.users.list.role,
    key: 'role',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.role.value.spec > b.role.value.spec
        ? 1
        : a.role.value.spec == b.role.value.spec
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 2,
  },
  {
    label: locale.ban,
    key: 'ban',
    sortable: true,
    sortFunction: (a: any, b: any): -1 | 0 | 1 =>
      a.value !== b.value ? 0 : a.value ? 1 : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 2,
  },
];

const refactorUser = (
  locale: ILocale,
  type: 'assignment' | 'tournament',
  user: IParticipant,
  spec: string,
  handleBan: (_: string, __: string, ___: boolean) => void
): any => ({
  ...user,
  login: {
    value: user.login,
    display: (
      <div className={tableStyles.titleWrapper}>
        <Link href={`/profile/${user.login}`} passHref>
          <a className={tableStyles.title}>{user.login}</a>
        </Link>
        {user.groups.length > 0 && (
          <span className={tableStyles.tags}>
            {user.groups.map((group, idx) => (
              <div className={tableStyles.tag} key={idx}>
                {group.name +
                  (idx == user.groups.length - 1 ? '' : ', ')}
              </div>
            ))}
          </span>
        )}
      </div>
    ),
  },
  shortName: {
    value: user.shortName,
    display: user.shortName,
  },
  role: {
    value: user.role,
    display: (
      <div
        style={{
          color:
            user.role.accessLevel > 50 ? 'var(--accent)' : 'black',
        }}
      >
        {capitalize(user.role.name)}
      </div>
    ),
  },
  ban: {
    value: user.banned,
    display: (
      <>
        {type === 'tournament' && (
          <>
            {!user.banned ? (
              <Button
                variant="outline"
                kind="negative"
                onClick={() => handleBan(user.login, spec, true)}
              >
                {locale.ban}
              </Button>
            ) : (
              <Button
                variant="outline"
                kind="positive"
                onClick={() => handleBan(user.login, spec, false)}
              >
                {locale.unban}
              </Button>
            )}
          </>
        )}
      </>
    ),
  },
});

const ParticipantsListWithBan: FC<{
  type: 'assignment' | 'tournament';
  spec: string;
}> = ({ type, spec }) => {
  const { locale, lang } = useLocale();
  const [refetch, setRefetch] = useState(false);

  const handleBan = useCallback(
    (login: string, spec: string, ban: boolean) => {
      requestWithNotify(
        `tournament/participants/${ban ? 'ban' : 'unban'}/${spec}`,
        'POST',
        ban
          ? locale.notify.tournament.banUser
          : locale.notify.tournament.unbanUser,
        lang,
        () => '',
        {
          login,
        },
        () => {
          setRefetch((val) => !val);
        }
      );
    },
    [locale, lang]
  );

  return (
    <div className={styles.wrapper}>
      <UserList
        key={+refetch}
        url={`${type}/participants/${spec}`}
        refactorUser={(user) =>
          refactorUser(locale, type, user, spec, handleBan)
        }
        initialColumns={initialColumns}
        noDefault
        empty={<>{locale.ui.table.emptyMessage}</>}
        classNames={{
          wrapper: tableStyles.wrapper,
          table: tableStyles.table,
          headerCell: styles.headerCell,
          cell: styles.cell,
          even: tableStyles.even,
          odd: tableStyles.odd,
        }}
      />
    </div>
  );
};

export default memo(ParticipantsListWithBan);
