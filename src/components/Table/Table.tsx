import { ITableColumn } from '@custom-types/ITable';
import { useLocale } from '@hooks/useLocale';
import {
  ActionIcon,
  Input,
  MultiSelect,
  Select,
} from '@mantine/core';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@modulz/radix-icons';
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

type callback = (list: any[]) => any[];
type setter = (_: callback) => void;

const Table: FC<{
  columns: ITableColumn[];
  rows: any[];
  classNames: any;
  defaultOnPage: number;
  onPage: number[];
  searchKeys: string[];
  additionalSearch?: (_: setter, afterSelect: any) => ReactNode;
  rowFilter?: (_: any) => boolean;
}> = ({
  columns,
  rows,
  classNames,
  defaultOnPage,
  onPage,
  searchKeys,
  additionalSearch,
  rowFilter,
}) => {
  const [localRows, setLocalRows] = useState(rows);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(defaultOnPage);

  const { locale } = useLocale();

  const [selectedColumns, setSelectedColumns] = useState(
    columns
      .filter((column) => !column.hidable || !column.hidden)
      .map((column) => column.key)
  );
  const [localColumns, setLocalColumns] = useState(columns);

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
      setSelectedColumns(value.sort());
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
    (key: any, order: -1 | 0 | 1) => {
      setLocalColumns((localColumns) =>
        localColumns.map((column) => {
          if (column.key !== key) {
            column.sorted = column.allowMiddleState ? 0 : 1;
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
            rowsToSort.sort(
              (a: any, b: any) => order * column.sortFunction(a, b)
            );
            return rowsToSort.filter(
              (row) => !!rowFilter && rowFilter(row)
            );
          });
        } else {
          setLocalRows(
            rows.filter((row) => !!rowFilter && rowFilter(row))
          );
        }
      }
    },
    [localColumns, rows, rowFilter]
  );

  const fuse = useMemo(
    () => {
      return new Fuse(rows, {
        keys: searchKeys.filter((column) =>
          selectedColumns.includes(column)
        ),
      });
    },
    [rows, selectedColumns] // eslint-disable-line
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
          <div className={styles.search}>
            <Input
              icon={<MagnifyingGlassIcon />}
              classNames={{
                input: styles.label,
              }}
              onChange={(e: any) => handleSearch(e.target.value)}
              placeholder={capitalize(locale.placeholders.search)}
              value={search}
            />
          </div>
          <div className={styles.columnSelect}>
            <MultiSelect
              classNames={{
                value: styles.selected,
              }}
              data={availableColumns}
              value={selectedColumns}
              onChange={handleChange}
              placeholder={capitalize(
                locale.placeholders.showColumns
              )}
            />
          </div>
          {additionalSearch &&
            additionalSearch(setLocalRows, beforeSelection)}
        </div>
        <InnerTable
          columns={localColumns.filter((column) => !column.hidden)}
          classNames={classNames}
          rows={
            perPage
              ? localRows.slice(page * perPage, (page + 1) * perPage)
              : localRows
          }
          sort={sort}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.pagesWrapper}>
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
              <DoubleArrowLeftIcon />
            </ActionIcon>
            <ActionIcon
              onClick={() => setPage((page) => max(page - 1, 0))}
            >
              <ChevronLeftIcon />
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
              <ChevronRightIcon />
            </ActionIcon>
            <ActionIcon onClick={() => setPage(lastPage)}>
              <DoubleArrowRightIcon />
            </ActionIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

const min = (a: number, b: number) => (a < b ? a : b);
const max = (a: number, b: number) => (a > b ? a : b);

export default memo(Table);
