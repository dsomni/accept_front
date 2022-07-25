import { setter } from '@custom-types/ui/atomic';
import { ITableColumn } from '@custom-types/ui/ITable';
import { useLocale } from '@hooks/useLocale';
import { Input, Loader, MultiSelect } from '@mantine/core';
import { Search } from 'tabler-icons-react';

import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import InnerTable from './InnerTable/InnerTable';
import styles from './table.module.css';
import { BaseSearch } from '@custom-types/data/request';
import PageNavigation from './PageNavigation';
import { LoadingOverlay } from '@mantine/core';

const Table: FC<{
  columns: ITableColumn[];
  classNames: any;
  defaultOnPage: number;
  onPage: number[];
  withSearch?: boolean;
  additionalSearch?: ReactNode;
  rows: any;
  total: number;
  loading: boolean;
  setSearchParams: setter;
  searchParams: BaseSearch;
}> = ({
  columns,
  classNames,
  defaultOnPage,
  onPage,
  withSearch,
  additionalSearch,
  rows,
  total,
  loading,
  setSearchParams,
  searchParams,
}) => {
  const { locale } = useLocale();

  const totalLength = total;

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
    (key: string, order: -1 | 0 | 1) => {
      // sort
      if (order == 0) {
        setSearchParams((searchParams: BaseSearch) => {
          const idx = searchParams.sort_by.findIndex(
            (item) => item.field == key
          );
          if (idx >= 0) {
            searchParams.sort_by.splice(idx, 1);
          }
          return {
            ...searchParams,
          };
        });
      } else {
        setSearchParams((searchParams: BaseSearch) => {
          const idx = searchParams.sort_by.findIndex(
            (item) => item.field === key
          );
          if (idx >= 0) {
            searchParams.sort_by[idx].order = order;
          } else {
            searchParams.sort_by.push({ field: key, order: order });
          }

          return { ...searchParams };
        });
      }
    },
    [setSearchParams]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      setSearchParams((searchParams: BaseSearch) => ({
        ...searchParams,
        search_params: {
          ...searchParams.search_params,
          search: value,
        },
      }));
    },
    [setSearchParams]
  );

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
                placeholder={locale.placeholders.search}
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
                placeholder={locale.placeholders.showColumns}
              />
            </div>
          )}
          {additionalSearch || <></>}
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
