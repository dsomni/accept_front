import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import { ITaskDisplay } from '@custom-types/data/ITask';
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
import { ITag } from '@custom-types/data/ITag';
import { hasSubarray } from '@utils/hasSubarray';
import { ITaskListBundle } from '@custom-types/data/bundle';
import { useRequest } from '@hooks/useRequest';
import { ILocale } from '@custom-types/ui/ILocale';
import { BaseSearch } from '@custom-types/data/request';
import Fuse from 'fuse.js';
import { MultiSelect } from '@ui/basics';
import { customTableSort } from '@utils/customTableSort';

interface Item {
  value: any;
  display: string | ReactNode;
}

interface ITaskDisplayList
  extends Omit<
    ITaskDisplay,
    'title' | 'author' | 'verdict' | 'complexity'
  > {
  title: Item;
  author: Item;
  verdict: Item;
  complexity: Item;
}

const DEFAULT_ON_PAGE = 10;

const TaskList: FC<{
  url: string;
  classNames?: any;
  initialColumns: (locale: ILocale) => ITableColumn[];
  refactorTask: (task: ITaskDisplay) => any;
  noDefault?: boolean;
  empty?: ReactNode;
  defaultRowsOnPage?: number;
}> = ({
  url,
  classNames,
  initialColumns,
  refactorTask,
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

  const [tags, setTags] = useState<ITag[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  const [tasks, setTasks] = useState<ITaskDisplayList[]>([]);

  const processData = useCallback(
    (
      response: ITaskListBundle
    ): { tasks: ITaskDisplayList[]; tags: ITag[] } => ({
      tasks: response.tasks.map((item) => refactorTask(item)),
      tags: response.tags,
    }),
    [refactorTask]
  );

  const { data, loading } = useRequest<
    {},
    ITaskListBundle,
    { tasks: ITaskDisplayList[]; tags: ITag[] }
  >(url, 'GET', undefined, processData);

  const [searchParams, setSearchParams] = useState<BaseSearch>({
    pager: {
      skip: 0,
      limit: defaultOnPage,
    },
    sort_by: [],
    search_params: {
      search: '',
      keys: [
        'title.value',
        'author.value',
        'verdict.value.shortText',
      ],
    },
  });

  const searchTags = useMemo(
    () =>
      tags.map((tag) => ({
        label: tag.title,
        value: tag.spec,
      })),
    [tags]
  );

  const applyFilters = useCallback(
    (data: ITaskDisplayList[]) => {
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

      const tagged =
        currentTags.length > 0
          ? searched.filter((task) =>
              hasSubarray(
                task.tags.map((tag) => tag.spec),
                currentTags
              )
            )
          : searched;

      const sorted = tagged.sort((a, b) =>
        customTableSort(a, b, searchParams.sort_by, columns)
      );

      const paged = sorted.slice(
        searchParams.pager.skip,
        searchParams.pager.limit > 0
          ? searchParams.pager.skip + searchParams.pager.limit
          : undefined
      );
      setTasks(paged);
    },
    [columns, currentTags, searchParams]
  );

  useEffect(() => {
    if (data) {
      applyFilters(data.tasks);
      setTags(data.tags);
    }
  }, [applyFilters, data]);

  return (
    <div>
      <Table
        withSearch
        columns={columns}
        rows={tasks}
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
        total={tasks.length}
        loading={loading}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        additionalSearch={
          <div>
            <MultiSelect
              searchable
              data={searchTags}
              onChange={setCurrentTags}
              placeholder={locale.placeholders.selectTags}
            />
          </div>
        }
      />
    </div>
  );
};

export default memo(TaskList);
