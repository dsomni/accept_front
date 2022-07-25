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
import {
  IAssignmentSchemaDisplay,
  IAssignmentSchemaListBundle,
} from '@custom-types/data/IAssignmentSchema';
import { useRouter } from 'next/router';
import { Plus } from 'tabler-icons-react';
import { ITag } from '@custom-types/data/ITag';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { BaseSearch } from '@custom-types/data/request';
import { useRequest } from '@hooks/useRequest';
import { ILocale } from '@custom-types/ui/ILocale';
import Fuse from 'fuse.js';
import { hasSubarray } from '@utils/hasSubarray';
import MultiSelect from '@ui/Select/MultiSelect';
import { customTableSort } from '@utils/customTableSort';

interface Item {
  value: any;
  display: string | ReactNode;
}

interface IAssignmentSchemaDisplayList
  extends Omit<
    IAssignmentSchemaDisplay,
    'title' | 'author' | 'taskNumber'
  > {
  title: Item;
  author: Item;
  taskNumber: Item;
}

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: locale.assignmentSchema.list.title,
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
    size: 6,
  },
  {
    label: locale.assignmentSchema.list.author,
    key: 'author',
    sortable: true,
    sortFunction: (a: any, b: any) => {
      return a.author.value > b.author.value
        ? 1
        : a.author.value == b.author.value
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
    label: locale.assignmentSchema.list.taskNumber,
    key: 'taskNumber',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.taskNumber.value > b.taskNumber.value
        ? 1
        : a.taskNumber.value == b.taskNumber.value
        ? 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 3,
  },
];

const processData = (
  data: IAssignmentSchemaListBundle
): {
  assignment_schemas: IAssignmentSchemaDisplayList[];
  tags: ITag[];
} => {
  const assignment_schemas = data.assignment_schemas.map(
    (assignment_schema: IAssignmentSchemaDisplay): any => ({
      ...assignment_schema,
      author: {
        value: assignment_schema.author.shortName,
        display: assignment_schema.author.shortName,
      },
      title: {
        value: assignment_schema.title,
        display: (
          <div className={tableStyles.titleWrapper}>
            <a
              className={tableStyles.title}
              href={`/edu/assignment_schema/${assignment_schema.spec}`}
            >
              {assignment_schema.title}
            </a>
            {assignment_schema.tags.length > 0 && (
              <span className={tableStyles.tags}>
                {assignment_schema.tags.map((tag, idx) => (
                  <div className={tableStyles.tag} key={idx}>
                    {tag.title +
                      (idx == assignment_schema.tags.length - 1
                        ? ''
                        : ', ')}
                  </div>
                ))}
              </span>
            )}
          </div>
        ),
      },
      taskNumber: {
        value: assignment_schema.taskNumber,
        display: assignment_schema.taskNumber,
      },
    })
  );
  const tags = data.tags;
  return { assignment_schemas, tags };
};

const defaultOnPage = 10;

function AssignmentList() {
  const { locale } = useLocale();
  const router = useRouter();
  const [list, setList] = useState<IAssignmentSchemaDisplayList[]>(
    []
  );
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
      keys: ['title.value', 'author.value'],
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

  const { data, loading, error, detail, refetch } = useRequest<
    {},
    IAssignmentSchemaListBundle,
    {
      assignment_schemas: IAssignmentSchemaDisplayList[];
      tags: ITag[];
    }
  >('assignment_schema/list', 'GET', undefined, processData);

  const applyFilters = useCallback(
    (data: IAssignmentSchemaDisplayList[]) => {
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
                task.tags.map((tag: ITag) => tag.spec),
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
      applyFilters(data.assignment_schemas);
      setTags(data.tags);
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
        total={data?.assignment_schemas.length || 0}
        loading={loading}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        withSearch
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
      <SingularSticky
        color="green"
        onClick={() => router.push(`/edu/assignment_schema/add/`)}
        icon={<Plus height={25} width={25} />}
      />
    </div>
  );
}

AssignmentList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentList;
