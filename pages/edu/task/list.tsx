import Table from '@components/Table/Table';
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
import styles from '@styles/edu/task.list.module.css';
import { capitalize } from '@utils/capitalize';
import { useLocale } from '@hooks/useLocale';
import { ITag } from '@custom-types/ITag';
import { MultiSelect } from '@mantine/core';
import { hasSubarray } from '@utils/hasSubarray';
import router, { useRouter } from 'next/router';
import { PlusIcon } from '@modulz/radix-icons';
import Sticky from '@components/Sticky/Sticky';

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
      if (res && !cleanUp) {
        let newTags = new Map<string, ITag>();
        for (let i = 0; i < res.length; i++)
          newTags.set(res[i].spec, res[i]);
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
        if (res) {
          setList(
            res.map((item) => {
              return {
                ...item,
                tags: item.tags.map(
                  (tag) => tags.get(tag)?.title || ''
                ),
                title: {
                  title: item.title,
                  display: (
                    <div className={styles.titleWrapper}>
                      <a
                        className={styles.title}
                        href={`/edu/task/${item.spec}`}
                      >
                        {item.title}
                      </a>
                      {!!tags && (
                        <span className={styles.tags}>
                          {item.tags.map((tag, idx) => (
                            <div className={styles.tag} key={idx}>
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
      <div className={styles.selectWrapper}>
        <MultiSelect
          classNames={{
            value: styles.selected,
          }}
          data={Array.from(tags.values()).map((tag) => tag.title)}
          onChange={(value: string[]) => {
            beforeSelect();
            setCurrentTags(value);
            if (value.length > 0) {
              setter(() =>
                list.filter((row) => hasSubarray(row.tags, value))
              );
            } else {
              setter(() => list);
            }
          }}
          placeholder={capitalize(locale.placeholders.selectTags)}
        />
      </div>
    ),
    [locale, list, tags]
  );

  return (
    <div>
      {!loading && tags.size > 0 && (
        <Table
          columns={columns}
          rows={list}
          classNames={{
            wrapper: styles.wrapper,
            table: styles.table,
            author: styles.author,
            grade: styles.grade,
            verdict: styles.verdict,
            headerCell: styles.headerCell,
            cell: styles.cell,
            even: styles.even,
            odd: styles.odd,
          }}
          defaultOnPage={10}
          onPage={[5, 10]}
          searchKeys={['title.value', 'author', 'grade']}
          rowFilter={rowFilter}
          additionalSearch={tagSearch}
        />
      )}
      <Sticky
        color={'--primary'}
        actions={[
          {
            color: 'green',
            onClick: () => {
              router.push(`/edu/task/add/`);
            },
            icon: <PlusIcon height={20} width={20} />,
          },
        ]}
      />
    </div>
  );
}

TaskList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TaskList;
