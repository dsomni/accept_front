import Table from '@components/Table/Table';
import { ITableColumn } from '@custom-types/ITable';
import { ITaskList } from '@custom-types/ITask';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { sendRequest } from '@requests/request';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import styles from '@styles/edu/task.list.module.css';
import { capitalize } from '@utils/capitalize';
import { useLocale } from '@hooks/useLocale';

function TaskList() {
  const [list, setList] = useState<ITaskList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { locale } = useLocale();

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        label: capitalize(locale.tasks.list.title),
        key: 'title',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.title > b.title ? 1 : a.title == b.title ? 0 : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: false,
        hidden: false,
        size: '9',
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
        size: '3',
      },
      {
        label: capitalize(locale.tasks.list.grade),
        key: 'grade',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.grade > b.grade ? 1 : a.grade == b.grade ? 0 : -1,
        sorted: 0,
        allowMiddleState: false,
        hidable: true,
        hidden: false,
        size: '1',
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
        size: '1',
      },
    ],
    [locale]
  );

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    sendRequest<{}, ITaskList[]>('tasks/list', 'GET').then((res) => {
      if (!cleanUp) {
        if (res) {
          setList(res);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    });
    return () => {
      cleanUp = true;
    };
  }, []);

  return (
    <div>
      {!loading && (
        <Table
          columns={columns}
          rows={list}
          classNames={{
            wrapper: styles.wrapper,
            table: styles.table,
            title: styles.title,
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
          searchKeys={['title', 'author', 'grade']}
        />
      )}
    </div>
  );
}

TaskList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TaskList;
