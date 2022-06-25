import { pureCallback, setter } from '@custom-types/ui/atomic';
import { ITableColumn } from '@custom-types/ui/ITable';
import { useLocale } from '@hooks/useLocale';
import {
  ActionIcon,
  Input,
  Loader,
  MultiSelect,
  Select,
} from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { capitalize } from '@utils/capitalize';
import {
  FC,
  memo,
  ReactNode,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import InnerTable from './InnerTable/InnerTable';
import styles from './table.module.css';
import { BaseSearch } from '@custom-types/data/request';
import PageNavigation from './PageNavigation';
import { useTableStore } from '@hooks/useTableStore';
import { LoadingOverlay } from '@mantine/core';

const Table: FC<{
  columns: ITableColumn[];
  classNames: any;
  defaultOnPage: number;
  onPage: number[];
  withSearch?: boolean;
  additionalSearch?: (_: setter, afterSelect: any) => ReactNode;
  rowFilter?: (_: any) => boolean;
}> = ({
  columns,
  classNames,
  defaultOnPage,
  onPage,
  withSearch,
  additionalSearch,
  rowFilter,
}) => {
  const { locale } = useLocale();

  const { data, loading, setSearchParams, searchParams } =
    useTableStore();

  const totalLength = useMemo(() => data[1], [data]);
  const rows = useMemo(() => data[0], [data]);

  const [localRows, setLocalRows] = useState<any[]>(rows);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(defaultOnPage);
  const [search, setSearch] = useState('');
  const [localColumns, setLocalColumns] = useState(
    columns.filter((column) => !column.hidden)
  );

  const handlePageChange = useCallback(
    (value: number) => {
      setPage(value);
      setSearchParams((searchParams: BaseSearch) => ({
        ...searchParams,
        pager: {
          ...searchParams.pager,
          skip: perPage * value,
        },
      }));
    },
    [perPage, setSearchParams, setPage]
  );

  const handlePerPageChange = useCallback(
    (value: number) => {
      setPerPage(value);
      setSearchParams((searchParams: BaseSearch) => ({
        ...searchParams,
        pager: {
          skip: 0,
          limit: value,
        },
      }));
    },
    [setSearchParams, setPerPage]
  );

  useEffect(() => {
    setLocalRows(rows);
    if (searchParams) {
      setSearch(searchParams.search_params.search);
      setLocalColumns((localColumns) => {
        const columns_indexes: { [key: string]: number } = {};
        for (let idx = 0; idx < localColumns.length; idx++) {
          columns_indexes[localColumns[idx].key] = idx;
        }
        searchParams.sort_by.map(
          (item) =>
            (localColumns[columns_indexes[item.field]].sorted =
              item.order)
        );

        return localColumns;
      });
      setPerPage(searchParams.pager.limit);
      setPage(
        Math.floor(
          searchParams.pager.skip / (searchParams.pager.limit || 1)
        )
      );
    }
  }, [searchParams, rows]);

  useEffect(() => {
    setLocalColumns((localColumns) => {
      const keys = localColumns.map((column) => column.key);
      return columns.filter((column) => keys.includes(column.key));
    });
  }, [columns]);

  const [selectedColumns, setSelectedColumns] = useState<
    string[] | undefined
  >(
    columns
      .filter((column) => !column.hidable || !column.hidden)
      .map((column) => column.key)
  );

  const availableColumns = useMemo(
    () =>
      columns
        .filter((column) => column.hidable)
        .map((column) => ({
          label: column.label,
          value: column.key,
        })),
    [columns]
  );

  const handleChange = useCallback(
    (value: string[]) => {
      setSelectedColumns(value.length > 0 ? value.sort() : undefined);
      setLocalColumns(
        columns.filter(
          (column) => !column.hidable || value.includes(column.key)
        )
      );
    },
    [columns]
  );

  const sort = useCallback(
    (key: string, order: -1 | 0 | 1, ignoreZero?: boolean) => {
      // sort
      if (order == 0) {
        setSearchParams((searchParams: BaseSearch) => {
          const idx = searchParams.sort_by.findIndex(
            (item) => item.field == key
          );
          if (idx >= 0) {
            searchParams.sort_by.splice(idx, 1);
          }
          return searchParams;
        });
      } else {
        setSearchParams(
          (searchParams: BaseSearch) =>
            ({
              ...searchParams,
              sort_by: [{ field: key, order: order }],
            } as BaseSearch)
        );
      }
    },
    [setSearchParams]
  );

  const handleSearch = useCallback(
    (value: string, shouldCancelFilter?: boolean) => {
      setSearch(value);
      // startTransition(() => {
      setSearchParams((searchParams: BaseSearch) => ({
        ...searchParams,
        search_params: {
          ...searchParams.search_params,
          search: value,
        },
      }));
      // });
    },
    [setSearchParams]
  );

  const beforeSelection = useCallback(() => {
    handleSearch('', true);
    setLocalColumns((localColumns) =>
      localColumns.map((column) => {
        column.sorted = column.allowMiddleState ? 0 : 1;
        return column;
      })
    );
  }, [handleSearch, setLocalColumns]);

  return (
    <div className={styles.wrapper + ' ' + classNames.wrapper}>
      <div className={styles.main}>
        <div className={styles.searchWrapper}>
          {withSearch && (
            <div className={styles.search}>
              <Input
                icon={<Search />}
                classNames={{
                  input: styles.inputElem,
                }}
                onChange={(e: any) => handleSearch(e.target.value)}
                placeholder={capitalize(locale.placeholders.search)}
                value={search}
              />
            </div>
          )}
          {availableColumns.length > 0 && (
            <div className={styles.columnSelect}>
              <MultiSelect
                classNames={{
                  value: styles.selected,
                  input: styles.inputElem,
                }}
                data={availableColumns}
                value={selectedColumns}
                onChange={handleChange}
                placeholder={capitalize(
                  locale.placeholders.showColumns
                )}
              />
            </div>
          )}
          {additionalSearch &&
            additionalSearch(setLocalRows, beforeSelection)}
        </div>
        <div style={{ position: 'relative' }}>
          <LoadingOverlay
            visible={loading}
            loader={<Loader size="xl" />}
          />
          <InnerTable
            columns={localColumns}
            classNames={classNames}
            rows={localRows}
            sort={sort}
          />
        </div>
        <PageNavigation
          onPage={onPage}
          defaultOnPage={defaultOnPage}
          perPage={perPage}
          page={page}
          totalLength={totalLength}
          handlePerPageChange={handlePerPageChange}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default memo(Table);
