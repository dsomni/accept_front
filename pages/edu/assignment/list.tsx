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
import { MultiSelect } from '@mantine/core';
import { hasSubarray } from '@utils/hasSubarray';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';

const DESCR_SLICE = 35;

function AssignmentList() {
  const [list, setList] = useState<IAssignmentSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const { locale } = useLocale();

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        label: capitalize(locale.assignmentSchema.list.title),
        key: 'title',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.title > b.title ? 1 : a.title == b.title ? 0 : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: false,
        hidden: true,
        size: 0,
      },
      {
        label: capitalize(locale.assignmentSchema.list.title),
        key: 'titleDisplay',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.title > b.title ? 1 : a.title == b.title ? 0 : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: false,
        hidden: false,
        size: 5,
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
        hidden: false,
        size: 8,
      },
      {
        label: capitalize(locale.assignmentSchema.list.taskCount),
        key: 'taskCount',
        sortable: false,
        sortFunction: () => 0,
        sorted: 0,
        allowMiddleState: false,
        hidable: true,
        hidden: false,
        size: 3,
      },
    ],
    [locale]
  );

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    sendRequest<{}, IAssignmentSchema[]>(
      'assignments/schema/list',
      'GET'
    ).then((res) => {
      if (res && !cleanUp) {
        setList(
          res.map((item) => {
            return {
              ...item,
              taskCount: item.tasks.length,
              description:
                item.description.slice(0, DESCR_SLICE) +
                (item.description.length <= DESCR_SLICE ? '' : '...'),
              titleDisplay: (
                <div className={styles.titleWrapper}>
                  <a
                    className={styles.title}
                    href={`/edu/assignemnt/${item.spec}`}
                  >
                    {item.title}
                  </a>
                </div>
              ),
            };
          })
        );
      } else {
        setError(true);
      }
      setLoading(false);
    });
    return () => {
      cleanUp = true;
    };
  }, []);

  const rowFilter = useCallback(
    (row) => {
      return hasSubarray(row.tags, currentTags);
    },
    [currentTags]
  );

  return (
    <div>
      {!loading && (
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
          searchKeys={['title', 'author']}
          rowFilter={rowFilter}
        />
      )}
    </div>
  );
}

AssignmentList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentList;
