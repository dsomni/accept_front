import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { sendRequest } from '@requests/request';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import tableStyles from '@styles/ui/customTable.module.css';
import { capitalize } from '@utils/capitalize';
import { useLocale } from '@hooks/useLocale';
import { useRouter } from 'next/router';
import { Plus } from 'tabler-icons-react';
import SingularSticky from '@components/ui/Sticky/SingularSticky';
import { ITournamentList } from '@custom-types/data/ITournament';

function AssignmentList() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const { locale } = useLocale();
  const router = useRouter();
  const { status } = router.query;

  useEffect(() => {
    setReady(false);
    if (
      !['current', 'archived', undefined].includes(status as string)
    ) {
      router.push('/Not_Found');
    } else if (status !== undefined) {
      setReady(true);
    }
  }, [status, router]);

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        label: capitalize(locale.tournament.list.title),
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
        label: capitalize(locale.tournament.list.author),
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
        label: capitalize(locale.tournament.list.start),
        key: 'start',
        sortable: false,
        sortFunction: (a: any, b: any) =>
          a.start > b.start ? 1 : a.start == b.start ? 0 : -1,
        sorted: 0,
        allowMiddleState: false,
        hidable: true,
        hidden: false,
        size: 3,
      },
      {
        label: capitalize(locale.tournament.list.end),
        key: 'end',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.end > b.end ? 1 : a.end == b.end ? 0 : -1,
        sorted: 0,
        allowMiddleState: true,
        hidable: true,
        hidden: false,
        size: 3,
      },
      {
        label: capitalize(locale.tournament.list.status),
        key: 'status',
        sortable: true,
        sortFunction: (a: any, b: any) =>
          a.status > b.status ? 1 : a.status == b.status ? 0 : -1,
        sorted: 0,
        allowMiddleState: true,
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
    sendRequest<{}, ITournamentList[]>(
      `tournaments/list/${status || 'current'}`,
      'GET',
      undefined,
      10000
    ).then((res) => {
      if (!cleanUp) {
        if (!res.error) {
          setList(
            res.response.map((item) => {
              return {
                ...item,
                title: {
                  value: item.title,
                  display: (
                    <div className={tableStyles.titleWrapper}>
                      <a
                        className={tableStyles.title}
                        href={`/tourneys/${item.spec}`}
                      >
                        {item.title}
                      </a>
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
  }, [status]);

  return (
    <div>
      {!loading && ready && (
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
        />
      )}
      <SingularSticky
        color="green"
        onClick={() => router.push(`/tourneys/add`)}
        icon={<Plus height={25} width={25} />}
      />
    </div>
  );
}

AssignmentList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentList;
