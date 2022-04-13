import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ITable';
import { ITaskList } from '@custom-types/ITask';
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
import { ITag } from '@custom-types/ITag';
import { hasSubarray } from '@utils/hasSubarray';
import router from 'next/router';
import { PlusIcon } from '@modulz/radix-icons';
import MultiSearch from '@components/ui/MultiSearch/MultiSearch';
import SingularSticky from '@components/ui/Sticky/SingularSticky';

function TaskList() {
  const [list, setList] = useState<ITaskList[]>([]);
  const [tags, setTags] = useState(new Map<string, ITag>());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const { locale } = useLocale();

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        label: capitalize(locale.tasks.list.title),
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
        label: capitalize(locale.tasks.list.author),
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
        label: capitalize(locale.tasks.list.grade),
        key: 'grade',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.grade > b.grade ? 1 : a.grade == b.grade ? 0 : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: true,
        hidden: false,
        size: 2,
      },
      {
        label: capitalize(locale.tasks.list.verdict),
        key: 'verdict',
        sortable: false,
        sortFunction: () => 0,
        sorted: 0,
        allowMiddleState: false,
        hidable: true,
        hidden: false,
        size: 2,
      },
    ],
    [locale]
  );
  const [loadingTags, setLoadingTags] = useState(true);

  useEffect(() => {
    let cleanUp = false;

    setLoadingTags(true);
    sendRequest<{}, ITag[]>('tags/list', 'GET').then((res) => {
      if (!res.error && !cleanUp) {
        let response = res.response;
        let newTags = new Map<string, ITag>();
        for (let i = 0; i < response.length; i++)
          newTags.set(response[i].spec, response[i]);
        setTags(newTags);
        setLoadingTags(false);
      }
    });

    return () => {
      cleanUp = true;
    };
  }, []);

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    sendRequest<{}, ITaskList[]>('tasks/list', 'GET').then((res) => {
      if (!cleanUp) {
        if (!res.error) {
          setList(
            res.response.map((item) => {
              return {
                ...item,
                tags: item.tags.map(
                  (tag) => tags.get(tag)?.title || ''
                ),
                title: {
                  value: item.title,
                  display: (
                    <div className={tableStyles.titleWrapper}>
                      <a
                        className={tableStyles.title}
                        href={`/edu/task/${item.spec}`}
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
        displayData={(tags: any[]) =>
          Array.from(tags.values()).map((tag: any) => tag.title)
        }
        rowField={'tags'}
      />
    ),
    [list, locale.placeholders.selectTags, tags]
  );

  return (
    <div>
      {!loading && tags.size > 0 && (
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
          searchKeys={['title.value', 'author', 'grade']}
          rowFilter={rowFilter}
          additionalSearch={tagSearch}
        />
      )}
      <SingularSticky
        color="green"
        onClick={() => router.push(`/edu/task/add/`)}
        icon={<PlusIcon height={20} width={20} />}
      />
    </div>
  );
}

TaskList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TaskList;
