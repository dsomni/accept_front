import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ITable';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { sendRequest } from '@requests/request';
import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import tableStyles from '@styles/ui/customTable.module.css';
import { capitalize } from '@utils/capitalize';
import { useLocale } from '@hooks/useLocale';
import { hasSubarray } from '@utils/hasSubarray';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import { useRouter } from 'next/router';
import { PlusIcon } from '@modulz/radix-icons';
import { ITag } from '@custom-types/ITag';
import MultiSearch from '@components/ui/MultiSearch/MultiSearch';
import SingularSticky from '@components/ui/Sticky/SingularSticky';

const DESCR_SLICE = 35;

function AssignmentList() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const { locale } = useLocale();
  const router = useRouter();

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        label: capitalize(locale.assignmentSchema.list.title),
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
        label: capitalize(locale.assignmentSchema.list.author),
        key: 'author',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.author > b.author ? 1 : a.author == b.author ? 0 : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: true,
        hidden: false,
        size: 3,
      },
      {
        label: capitalize(locale.assignmentSchema.list.description),
        key: 'description',
        sortable: false,
        sortFunction: () => 0,
        sorted: 0,
        allowMiddleState: false,
        hidable: true,
        hidden: true,
        size: 8,
      },
      {
        label: capitalize(locale.assignmentSchema.list.taskCount),
        key: 'taskCount',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.taskCount > b.taskCount
            ? 1
            : a.taskCount == b.taskCount
            ? 0
            : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: true,
        hidden: false,
        size: 3,
      },
    ],
    [locale]
  );

  const [tags, setTags] = useState(new Map<string, ITag>());
  const [loadingTags, setLoadingTags] = useState(true);

  useEffect(() => {
    let cleanUp = false;

    setLoadingTags(true);
    sendRequest<{}, ITag[]>('assignment_tags/list', 'GET').then(
      (res) => {
        if (res && !cleanUp) {
          let newTags = new Map<string, ITag>();
          for (let i = 0; i < res.length; i++)
            newTags.set(res[i].spec, res[i]);
          setTags(newTags);
          setLoadingTags(false);
        }
      }
    );

    return () => {
      cleanUp = true;
    };
  }, []);

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    sendRequest<{}, IAssignmentSchema[]>(
      'assignments/schema/list',
      'GET'
    ).then((res) => {
      if (!cleanUp) {
        if (res) {
          setList(
            res.map((item) => {
              return {
                ...item,
                tags: item.tags.map(
                  (tag) => tags.get(tag)?.title || ''
                ),
                taskCount: item.tasks.length,
                description:
                  item.description.slice(0, DESCR_SLICE) +
                  (item.description.length <= DESCR_SLICE
                    ? ''
                    : '...'),
                title: {
                  value: item.title,
                  display: (
                    <div className={tableStyles.titleWrapper}>
                      <a
                        className={tableStyles.title}
                        href={`/edu/assignment/${item.spec}`}
                      >
                        {item.title}
                      </a>
                      {!!tags && (
                        <span className={tableStyles.tags}>
                          {item.tags.map((tag, idx) => (
                            <div
                              className={tableStyles.tag}
                              key={idx}
                            >
                              {tags.get(tag)?.title +
                                (idx == item.tags.length - 1
                                  ? ''
                                  : ', ')}
                            </div>
                          ))}
                        </span>
                      )}
                    </div>
                  ),
                },
              };
            })
          );
        } else {
          setError(true);
        }
        setLoading(false);
      }
    });
    return () => {
      cleanUp = true;
    };
  }, [tags, loadingTags]);

  const rowFilter = useCallback(
    (row) => {
      return hasSubarray(row.tags, currentTags);
    },
    [currentTags]
  );

  const tagSearch = useCallback(
    (setter, beforeSelect) => (
      <MultiSearch
        setterFunc={setter}
        beforeSelect={beforeSelect}
        items={tags}
        setCurrentItems={setCurrentTags}
        rowList={list}
        placeholder={capitalize(locale.placeholders.selectTags)}
        displayData={(tags) =>
          Array.from(tags.values()).map((tag: any) => tag.title)
        }
        rowField={'tags'}
      />
    ),
    [list, locale.placeholders.selectTags, tags]
  );

  return (
    <div>
      {!loading && !loadingTags && (
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
          searchKeys={['title.value', 'author']}
          rowFilter={rowFilter}
          additionalSearch={tagSearch}
        />
      )}
      <SingularSticky
        color="green"
        onClick={() => router.push(`/edu/assignment/add/`)}
        icon={<PlusIcon height={20} width={20} />}
      />
    </div>
  );
}

AssignmentList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentList;
