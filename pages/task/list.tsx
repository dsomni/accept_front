import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import { ITaskDisplay } from '@custom-types/data/ITask';
import { DefaultLayout } from '@layouts/DefaultLayout';
import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';
import { ITag } from '@custom-types/data/ITag';
import { hasSubarray } from '@utils/hasSubarray';
import router from 'next/router';
import { Plus } from 'tabler-icons-react';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { ITaskListBundle } from '@custom-types/data/bundle';
import { useRequest } from '@hooks/useRequest';
import { ILocale } from '@custom-types/ui/ILocale';
import { BaseSearch } from '@custom-types/data/request';
import Fuse from 'fuse.js';
import MultiSelect from '@ui/Select/MultiSelect';
import { customTableSort } from '@utils/customTableSort';

interface Item {
  value: any;
  display: string | ReactNode;
}

interface ITaskDisplayList
  extends Omit<ITaskDisplay, 'title' | 'author' | 'verdict'> {
  title: Item;
  author: Item;
  verdict: Item;
}

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: locale.task.list.title,
    key: 'title',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.title.value > b.title.value
        ? 1
        : a.title.value == b.title.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 9,
  },
  {
    label: locale.task.list.author,
    key: 'author',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.author.value > b.author.value
        ? 1
        : a.author.value == b.author.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 3,
  },
  {
    label: locale.task.list.verdict,
    key: 'verdict',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      (a.verdict.value ? a.verdict.value.spec : 100) >
      (b.verdict.value ? b.verdict.value.spec : 100)
        ? 1
        : (a.verdict.value ? a.verdict.value.spec : 100) ==
          (b.verdict.value ? b.verdict.value.spec : 100)
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
  data: ITaskListBundle
): { tasks: ITaskDisplayList[]; tags: ITag[] } => {
  const tasks = data.tasks.map(
    (task: ITaskDisplay): ITaskDisplayList => ({
      ...task,
      author: {
        value: task.author.shortName,
        display: task.author.shortName,
      },
      verdict: {
        value: task.verdict,
        display: (
          <span
            style={{
              color: !task.verdict
                ? 'black'
                : task.verdict.spec == 0
                ? 'var(--positive)'
                : 'var(--negative)',
            }}
          >
            {task.verdict?.shortText || '-'}
          </span>
        ),
      },
      title: {
        value: task.title,
        display: (
          <div className={tableStyles.titleWrapper}>
            <a
              className={tableStyles.title}
              href={`/task/${task.spec}`}
            >
              {task.title}
            </a>
            {task.tags.length > 0 && (
              <span className={tableStyles.tags}>
                {task.tags.map((tag, idx) => (
                  <div className={tableStyles.tag} key={idx}>
                    {tag.title +
                      (idx == task.tags.length - 1 ? '' : ', ')}
                  </div>
                ))}
              </span>
            )}
          </div>
        ),
      },
    })
  );
  const tags = data.tags;
  return { tasks, tags };
};

const defaultOnPage = 10;

function TaskList() {
  const { locale } = useLocale();
  const [list, setList] = useState<ITaskDisplayList[]>([]);

  const [tags, setTags] = useState<ITag[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);

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

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale]
  );
  const searchTags = useMemo(
    () =>
      tags.map((tag) => ({
        label: tag.title,
        value: tag.spec,
      })),
    [tags]
  );

  const { data, loading, error, detail } = useRequest<
    {},
    ITaskListBundle,
    { tasks: ITaskDisplayList[]; tags: ITag[] }
  >('bundle/task_list', 'GET', undefined, processData);

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
      setList(paged);
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
      {tags.length > 0 && (
        <Table
          withSearch
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
          defaultOnPage={defaultOnPage}
          onPage={[5, 10]}
          total={data?.tasks.length || 0}
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
      )}
      <SingularSticky
        color="green"
        onClick={() => router.push(`/task/add/`)}
        icon={<Plus height={25} width={25} />}
      />
    </div>
  );
}

TaskList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TaskList;
