import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ITable';
import { ITaskDisplay } from '@custom-types/ITask';
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
import { ITaskListBundle } from '@custom-types/bundle';

interface Item {
  value: any;
  display: string | ReactNode;
}

interface ITaskDisplayList
  extends Omit<ITaskDisplay, 'title' | 'author'> {
  title: Item;
  author: Item;
}

function TaskList() {
  const [list, setList] = useState<ITaskDisplayList[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
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

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    sendRequest<{}, ITaskListBundle>('bundles/task_list', 'GET').then(
      (res) => {
        if (!cleanUp) {
          if (!res.error) {
            let tasks = res.response.tasks.map((task) => ({
              ...task,
              author: {
                value: task.author,
                display: task.author.shortName,
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
                              (idx == task.tags.length - 1
                                ? ''
                                : ', ')}
                          </div>
                        ))}
                      </span>
                    )}
                  </div>
                ),
              },
            }));
            let tags = res.response.tags;
            setTags(tags);
            setList(tasks);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      }
    );
    return () => {
      cleanUp = true;
    };
  }, []);

  useEffect(() => {
    console.log('currentTags', currentTags);
  }, [currentTags]);

  const rowFilter = useCallback(
    (row) => {
      console.log(
        row.tags.map((tag: ITag) => tag.title),
        currentTags
      );

      return hasSubarray(
        row.tags.map((tag: ITag) => tag.title),
        currentTags
      );
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
        displayData={(tags: ITag[]) =>
          tags.map((tag: ITag) => tag.title)
        }
        getCmpValues={(task: any) =>
          task['tags'].map((tag: any) => tag.title)
        }
      />
    ),
    [list, locale.placeholders.selectTags, tags]
  );

  return (
    <div>
      {!loading && tags.length > 0 && (
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
          searchKeys={['title.value', 'author.shortName']}
          rowFilter={rowFilter}
          additionalSearch={tagSearch}
        />
      )}
      <SingularSticky
        color="green"
        onClick={() => router.push(`/task/add/`)}
        icon={<PlusIcon height={25} width={25} />}
      />
    </div>
  );
}

TaskList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TaskList;
