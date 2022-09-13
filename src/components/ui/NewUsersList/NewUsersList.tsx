import {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';
import { ILocale } from '@custom-types/ui/ILocale';
import { BaseSearch } from '@custom-types/data/request';

import Fuse from 'fuse.js';
import { customTableSort } from '@utils/customTableSort';
import { IStudentAdd } from '@custom-types/data/IStudent';

const DEFAULT_ON_PAGE = 10;

const NewUsersList: FC<{
  data: IStudentAdd[];
  initialColumns: (_: ILocale) => ITableColumn[];
  classNames?: any;
  empty?: ReactNode;
  noDefault?: boolean;
  defaultRowsOnPage?: number;
}> = ({
  data,
  initialColumns,
  classNames,

  noDefault,
  empty,
  defaultRowsOnPage,
}) => {
  const { locale } = useLocale();

  const [users, setUsers] = useState<IStudentAdd[]>(data);

  const defaultOnPage = useMemo(
    () => defaultRowsOnPage || DEFAULT_ON_PAGE,
    [defaultRowsOnPage]
  );

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale, initialColumns]
  );

  const [searchParams, setSearchParams] = useState<BaseSearch>({
    pager: {
      skip: 0,
      limit: defaultOnPage,
    },
    sort_by: [],
    search_params: {
      search: '',
      keys: ['fullName'],
    },
  });

  const applyFilters = useCallback(
    (data: IStudentAdd[]) => {
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

      const sorted = searched.sort((a, b) =>
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
    [columns, searchParams]
  );

  useEffect(() => {
    applyFilters(data);
  }, [applyFilters, data]);

  return (
    <div>
      <Table
        columns={columns}
        rows={users}
        total={data.length}
        loading={false}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        noDefault={noDefault}
        empty={empty}
        withSearch
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
        defaultOnPage={defaultOnPage}
        onPage={[defaultOnPage, 30]}
      />
    </div>
  );
};

export default memo(NewUsersList);
