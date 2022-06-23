import { setter } from '@custom-types/ui/atomic';
import { ITableColumn } from '@custom-types/ui/ITable';
import { useLocale } from '@hooks/useLocale';
import {
  ActionIcon,
  Input,
  MultiSelect,
  Select,
} from '@mantine/core';
import {
  ArrowNarrowLeft,
  ArrowNarrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'tabler-icons-react';
import { capitalize } from '@utils/capitalize';
import Fuse from 'fuse.js';
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

const Table: FC<{
  columns: ITableColumn[];
  rows: any[];
  classNames: any;
  defaultOnPage: number;
  onPage: number[];
  searchKeys: string[];
  additionalSearch?: (_: setter, afterSelect: any) => ReactNode;
  rowFilter?: (_: any) => boolean;
  searchWeight?: number;
}> = ({
  columns,
  rows,
  classNames,
  defaultOnPage,
  onPage,
  searchKeys,
  additionalSearch,
  rowFilter,
  searchWeight,
}) => {
  const [localRows, setLocalRows] = useState(rows);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(defaultOnPage);
  const [sorted, setSorted] = useState(false);

  const { locale } = useLocale();

  const [selectedColumns, setSelectedColumns] = useState<
    string[] | undefined
  >(
    columns
      .filter((column) => !column.hidable || !column.hidden)
      .map((column) => column.key)
  );
  const [localColumns, setLocalColumns] = useState(
    columns.filter((column) => !column.hidden)
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

  useEffect(() => {
    setLocalColumns((localColumns) => {
      const keys = localColumns.map((column) => column.key);
      return columns.filter((column) => keys.includes(column.key));
    });
  }, [columns]);

  const sort = useCallback(
    (key: any, order: -1 | 0 | 1, ignoreZero?: boolean) => {
      setLocalColumns((localColumns) =>
        localColumns.map((column) => {
          if (column.key !== key) {
            if (column.sorted == 0) {
              column.sorted = column.allowMiddleState ? 0 : 1;
            }
            return column;
          }
          column.sorted = order;
          return column;
        })
      );
      const column = localColumns.find(
        (column) => column.key === key
      );
      if (column) {
        if (order !== 0) {
          setLocalRows((localRows) => {
            let rowsToSort = [...localRows];
            console.log('b', order, rowsToSort);
            rowsToSort.sort(
              (a: any, b: any) => order * column.sortFunction(a, b)
            );
            console.log('a', rowsToSort);
            return rowsToSort.filter(
              (row) =>
                typeof rowFilter !== 'function' || rowFilter(row)
            );
          });
        } else if (!ignoreZero) {
          setLocalRows(
            rows.filter(
              (row) =>
                typeof rowFilter !== 'function' || rowFilter(row)
            )
          );
        }
      }
    },
    [localColumns, rows, rowFilter]
  );

  useEffect(() => {
    for (let idx = 0; idx < columns.length; idx++) {
      const column = columns[idx];
      sort(column.key, column.sorted, true);
    }
    setSorted(true);
  }, []);

  const fuse = useMemo(
    () => {
      return new Fuse(rows, {
        keys: searchKeys,
      });
    },
    [rows] // eslint-disable-line
  );

  const handleSearch = useCallback(
    (value: string, shouldCancelFilter?: boolean) => {
      setSearch(value);
      if (value !== '') {
        setLocalRows(
          fuse
            .search(value)
            .map((result) => result.item)
            .filter(
              (row) =>
                shouldCancelFilter || (!!rowFilter && rowFilter(row))
            )
        );
      } else {
        setLocalRows(
          rows.filter(
            (row) =>
              shouldCancelFilter || (!!rowFilter && rowFilter(row))
          )
        );
      }
      setLocalColumns((localColumns) =>
        localColumns.map((column) => {
          column.sorted = column.allowMiddleState ? 0 : 1;
          return column;
        })
      );
    },
    [fuse, rows, rowFilter]
  );

  const lastPage = useMemo(
    () => Math.floor(localRows.length / perPage),
    [localRows, perPage]
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
          {searchKeys.length > 0 && (
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
        {sorted && (
          <InnerTable
            columns={localColumns}
            classNames={classNames}
            rows={
              perPage
                ? localRows.slice(
                    page * perPage,
                    (page + 1) * perPage
                  )
                : localRows
            }
            sort={sort}
          />
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.pagesWrapper}>
          <div className={styles.overall}>
            {capitalize(locale.table.overall)} {localRows.length}
          </div>
          <div className={styles.pageNavigationWrapper}>
            <div className={styles.perPageWrapper}>
              <div className={styles.perPage}>
                {capitalize(locale.table.perPage) + ':'}{' '}
              </div>
              <Select
                data={onPage
                  .map((value) => ({
                    label: value.toString(),
                    value: value.toString(),
                  }))
                  .concat({
                    label: capitalize(locale.all),
                    value: '0',
                  })}
                classNames={{
                  input: styles.selectPerPage,
                }}
                defaultValue={defaultOnPage.toString()}
                onChange={(value) => setPerPage(Number(value))}
              />
            </div>
            <div className={styles.pageNavigation}>
              <ActionIcon onClick={() => setPage(0)}>
                <ArrowNarrowLeft />
              </ActionIcon>
              <ActionIcon
                onClick={() => setPage((page) => max(page - 1, 0))}
              >
                <ChevronLeft />
              </ActionIcon>
              <div>
                {page * perPage + 1} -{' '}
                {perPage
                  ? min((page + 1) * perPage, localRows.length)
                  : localRows.length}
              </div>
              <ActionIcon
                onClick={() =>
                  setPage((page) => min(page + 1, lastPage))
                }
              >
                <ChevronRight />
              </ActionIcon>
              <ActionIcon onClick={() => setPage(lastPage)}>
                <ArrowNarrowRight />
              </ActionIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const min = (a: number, b: number) => (a < b ? a : b);
const max = (a: number, b: number) => (a > b ? a : b);

export default memo(Table);
