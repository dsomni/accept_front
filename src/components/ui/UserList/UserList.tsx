import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import {
  FC,
  ReactNode,
  memo,
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
import { customTableSort } from '@utils/customTableSort';
import { IUser, IUserListBundle } from '@custom-types/data/IUser';
import { IGroup } from '@custom-types/data/IGroup';
import { IRole } from '@custom-types/data/atomic';
import { capitalize } from '@utils/capitalize';
import { MultiSelect } from '@ui/basics';

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

const DEFAULT_ON_PAGE = 10;

const UsersList: FC<{
  url: string;
  classNames?: any;
  initialColumns: (locale: ILocale) => ITableColumn[];
  refactorUser: (user: IUser) => any;
  noDefault?: boolean;
  empty?: ReactNode;
  defaultRowsOnPage?: number;
}> = ({
  url,
  classNames,
  initialColumns,
  refactorUser,
  noDefault,
  empty,
  defaultRowsOnPage,
}) => {
  const { locale } = useLocale();
  const defaultOnPage = useMemo(
    () => defaultRowsOnPage || DEFAULT_ON_PAGE,
    [defaultRowsOnPage]
  );

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [initialColumns, locale]
  );

  const [groups, setGroups] = useState<IGroup[]>([]);
  const [currentGroups, setCurrentGroups] = useState<string[]>([]);

  const [roles, setRoles] = useState<IRole[]>([]);
  const [currentRoles, setCurrentRoles] = useState<string[]>([]);

  const [users, setUsers] = useState<IUserDisplayList[]>([]);

  const processData = useCallback(
    (
      response: IUserListBundle
    ): {
      users: IUserDisplayList[];
      groups: IGroup[];
      roles: IRole[];
    } => ({
      users: response.users.map((item) => refactorUser(item)),
      groups: response.groups,
      roles: response.roles,
    }),
    [refactorUser]
  );

  const { data, loading } = useRequest<
    {},
    IUserListBundle,
    {
      users: IUserDisplayList[];
      groups: IGroup[];
      roles: IRole[];
    }
  >(url, 'GET', undefined, processData);

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
      setUsers(paged);
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
        rows={users}
        classNames={
          classNames
            ? classNames
            : {
                wrapper: tableStyles.wrapper,
                table: tableStyles.table,
                author: tableStyles.author,
                grade: tableStyles.grade,
                verdict: tableStyles.verdict,
                headerCell: tableStyles.headerCell,
                cell: tableStyles.cell,
                even: tableStyles.even,
                odd: tableStyles.odd,
              }
        }
        noDefault={noDefault}
        empty={empty}
        defaultOnPage={defaultOnPage}
        onPage={[5, defaultOnPage]}
        total={users.length}
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
};

export default memo(UsersList);
