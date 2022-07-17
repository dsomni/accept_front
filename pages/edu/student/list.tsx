import { IGroupDisplay } from '@custom-types/data/IGroup';
import { IStudentList } from '@custom-types/data/IStudent';
import { ITableColumn } from '@custom-types/ui/ITable';
import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { sendRequest } from '@requests/request';

import {
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import tableStyles from '@styles/ui/customTable.module.css';
import Table from '@ui/Table/Table';
import { Plus } from 'tabler-icons-react';
import MultiSearch from '@ui/MultiSearch/MultiSearch';
import { hasSubarray } from '@utils/hasSubarray';
import styles from '@styles/edu/student.list.module.css';
import { ActionIcon } from '@mantine/core';

function StudentList() {
  const [list, setList] = useState<IStudentList[]>([]);
  const [groups, setGroups] = useState(
    new Map<string, IGroupDisplay>()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentGroups, setCurrentGroups] = useState<string[]>([]);
  const { locale } = useLocale();

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        label: locale.users.list.login,
        key: 'login',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.login > b.login ? 1 : a.login == b.login ? 0 : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: true,
        hidden: false,
        size: 3,
      },
      {
        label: locale.users.list.name,
        key: 'name',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.name.value > b.name.value
            ? 1
            : a.name.value == b.name.value
            ? 0
            : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: false,
        hidden: false,
        size: 9,
      },
      {
        label: locale.users.list.grade,
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
    ],
    [locale]
  );
  const [loadingGroups, setLoadingGroups] = useState(true);

  useEffect(() => {
    let cleanUp = false;

    setLoadingGroups(true);
    sendRequest<{}, IGroupDisplay[]>(
      'groups/list',
      'GET',
      undefined,
      5000
    ).then((res) => {
      if (!res.error && !cleanUp) {
        let response = res.response;
        let newGroups = new Map<string, IGroupDisplay>();
        for (let i = 0; i < response.length; i++)
          newGroups.set(response[i].spec, response[i]);
        setGroups(newGroups);
        setLoadingGroups(false);
      }
    });

    return () => {
      cleanUp = true;
    };
  }, []);

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    sendRequest<{}, IStudentList[]>(
      'students/list',
      'GET',
      undefined,
      600000
    ).then((res) => {
      if (!cleanUp) {
        if (!res.error) {
          setList(
            res.response.map((item) => {
              return {
                ...item,
                groups: item.groups.map(
                  (group) => groups.get(group)?.title || ''
                ),
                grade: item.gradeNumber + ' ' + item.gradeLetter,
                name: {
                  value: item.name,
                  display: (
                    <div className={tableStyles.titleWrapper}>
                      <a
                        className={tableStyles.title}
                        href={`/edu/student/${item.login}`}
                      >
                        {item.name}
                      </a>
                      {!!groups && (
                        <span className={tableStyles.tags}>
                          {item.groups.map((group, idx) => (
                            <div
                              className={tableStyles.tag}
                              key={idx}
                            >
                              {groups.get(group)?.title +
                                (idx == item.groups.length - 1
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
  }, [groups, loadingGroups]);

  const rowFilter = useCallback(
    (row) => {
      return hasSubarray(row.groups, currentGroups);
    },
    [currentGroups]
  );

  const groupSearch = useCallback(
    (setter, beforeSelect) => (
      <div className={styles.groupSearch}>
        <MultiSearch
          setterFunc={setter}
          beforeSelect={beforeSelect}
          items={groups}
          setCurrentItems={setCurrentGroups}
          rowList={list}
          placeholder={locale.placeholders.selectGroups}
          displayData={(groups) =>
            Array.from(groups.values()).map(
              (group: any) => group.title
            )
          }
          rowField={'groups'}
        />
        <ActionIcon
          component="a"
          href={`/edu/group/add`}
          target="_blank"
          size={48}
          variant="outline"
          color="var(--primary)"
        >
          <Plus width={25} height={25} />
        </ActionIcon>
      </div>
    ),
    [groups, list, locale]
  );

  return (
    <div>
      {!loading && groups.size > 0 && (
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
          searchKeys={['name.value', 'grade', 'login']}
          rowFilter={rowFilter}
          additionalSearch={groupSearch}
        />
      )}
    </div>
  );
}

StudentList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default StudentList;
