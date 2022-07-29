import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import { DefaultLayout } from '@layouts/DefaultLayout';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';
import { BaseSearch } from '@custom-types/data/request';
import { useRequest } from '@hooks/useRequest';
import { ILocale } from '@custom-types/ui/ILocale';
import Fuse from 'fuse.js';
import { hasSubarray } from '@utils/hasSubarray';
import { MultiSelect } from '@ui/basics';
import { customTableSort } from '@utils/customTableSort';
import { IUser, IUserListBundle } from '@custom-types/data/IUser';
import { IGroup } from '@custom-types/data/IGroup';
import { IRole } from '@custom-types/data/atomic';
import { capitalize } from '@utils/capitalize';

interface Item<T = any> {
  value: T;
  display: string | ReactNode;
}

interface IUserDisplayList
  extends Omit<IUser, 'login' | 'shortName' | 'role'> {
  login: Item<string>;
  shortName: Item<string>;
  role: Item<IRole>;
}

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

const processData = (
  data: IUserListBundle
): {
  users: IUserDisplayList[];
  groups: IGroup[];
  roles: IRole[];
} => {
  const users = data.users.map((user: IUser): any => ({
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
  }));
  const groups = data.groups;
  const roles = data.roles;
  return { users, groups, roles };
};

const defaultOnPage = 10;

function UsersList() {
  const { locale } = useLocale();
  const [list, setList] = useState<IUserDisplayList[]>([]);

  const [groups, setGroups] = useState<IGroup[]>([]);
  const [currentGroups, setCurrentGroups] = useState<string[]>([]);

  const [roles, setRoles] = useState<IRole[]>([]);
  const [currentRoles, setCurrentRoles] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useState<BaseSearch>({
    pager: {
      skip: 0,
      limit: defaultOnPage,
    },
    sort_by: [],
    search_params: {
      search: '',
      keys: ['login.value', 'shortName.value'],
    },
  });

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale]
  );

  const searchGroups = useMemo(
    () =>
      groups.map((group) => ({
        label: group.name,
        value: group.spec,
      })),
    [groups]
  );
  const searchRoles = useMemo(
    () =>
      roles.map((role) => ({
        label: capitalize(role.name),
        value: role.spec.toString(),
      })),
    [roles]
  );

  const { data, loading, error, detail, refetch } = useRequest<
    {},
    IUserListBundle,
    {
      users: IUserDisplayList[];
      groups: IGroup[];
      roles: IRole[];
    }
  >('user/list', 'GET', undefined, processData);

  const applyFilters = useCallback(
    (data: IUserDisplayList[]) => {
      var list = [...data];
      const fuse = new Fuse(list, {
        keys: searchParams.search_params.keys,
        findAllMatches: true,
      });

      const searched =
        searchParams.search_params.search == ''
          ? list
          : fuse
              .search(searchParams.search_params.search)
              .map((result) => result.item);

      const grouped =
        currentGroups.length > 0
          ? searched.filter((user) =>
              hasSubarray(
                user.groups.map((group: IGroup) => group.spec),
                currentGroups
              )
            )
          : searched;

      const withRole =
        currentRoles.length > 0
          ? grouped.filter((user) =>
              currentRoles.includes(user.role.value.spec.toString())
            )
          : grouped;

      const sorted = withRole.sort((a, b) =>
        customTableSort(a, b, searchParams.sort_by, columns)
      );

      const paged = sorted.slice(
        searchParams.pager.skip,
        searchParams.pager.limit > 0
          ? searchParams.pager.skip + searchParams.pager.limit
          : undefined
      );
      setList(paged);
    },
    [columns, currentGroups, currentRoles, searchParams]
  );

  useEffect(() => {
    if (data) {
      applyFilters(data.users);
      setGroups(data.groups);
      setRoles(data.roles);
    }
  }, [data, applyFilters]);

  return (
    <div>
      <Table
        columns={columns}
        rows={list}
        classNames={{
          wrapper: tableStyles.wrapper,
          table: tableStyles.table,
          author: tableStyles.author,
          grade: tableStyles.grade,
          verdict: tableStyles.verdict,
          headerCell: tableStyles.headerCell,
          cell: tableStyles.cell,
          even: tableStyles.even,
          odd: tableStyles.odd,
        }}
        defaultOnPage={10}
        onPage={[5, 10]}
        total={data?.users.length || 0}
        loading={loading}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        withSearch
        additionalSearch={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 'var(--spacer-l)',
            }}
          >
            <MultiSelect
              searchable
              data={searchGroups}
              onChange={setCurrentGroups}
              placeholder={locale.placeholders.selectGroups}
            />
            <MultiSelect
              searchable
              data={searchRoles}
              onChange={setCurrentRoles}
              placeholder={locale.placeholders.selectRoles}
            />
          </div>
        }
      />
    </div>
  );
}

UsersList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default UsersList;
