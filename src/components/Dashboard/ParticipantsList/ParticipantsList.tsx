import { FC, memo } from 'react';
import { ITableColumn } from '@custom-types/ui/ITable';

import tableStyles from '@styles/ui/customTable.module.css';
import { ILocale } from '@custom-types/ui/ILocale';
import { IUser } from '@custom-types/data/IUser';
import { capitalize } from '@utils/capitalize';
import UserList from '@ui/UserList/UserList';

import styles from './participantsList.module.css';
import { useLocale } from '@hooks/useLocale';

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
];

const refactorUser = (user: IUser): any => ({
  ...user,
  login: {
    value: user.login,
    display: (
      <div className={tableStyles.titleWrapper}>
        <a
          className={tableStyles.title}
          href={`/profile/${user.login}`}
        >
          {user.login}
        </a>
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
});

const ParticipantsList: FC<{
  type: 'assignment' | 'tournament';
  spec: string;
}> = ({ type, spec }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <UserList
        url={`${type}/participants/${spec}`}
        refactorUser={refactorUser}
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

export default memo(ParticipantsList);
