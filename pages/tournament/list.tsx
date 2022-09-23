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
  ITournamentDisplay,
  ITournamentListBundle,
} from '@custom-types/data/ITournament';
import { Clock, Lock, Plus, Run } from 'tabler-icons-react';
import { ITag } from '@custom-types/data/ITag';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { BaseSearch } from '@custom-types/data/request';
import { useRequest } from '@hooks/useRequest';
import { ILocale } from '@custom-types/ui/ILocale';
import Fuse from 'fuse.js';
import { hasSubarray } from '@utils/hasSubarray';
import { MultiSelect } from '@ui/basics';
import { customTableSort } from '@utils/customTableSort';
import Title from '@ui/Title/Title';
import { getLocalDate } from '@utils/datetime';

interface Item {
  value: any;
  display: string | ReactNode;
}

interface ITournamentDisplayList
  extends Omit<
    ITournamentDisplay,
    'title' | 'author' | 'start' | 'end' | 'status'
  > {
  title: Item;
  author: Item;
  start: Item;
  end: Item;
  status: Item;
}

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: locale.tournament.list.status,
    key: 'status',
    sortable: true,
    sortFunction: (a: any, b: any) => {
      return a.status.value > b.status.value
        ? 1
        : a.status.value == b.status.value
        ? 0
        : -1;
    },
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 1,
  },
  {
    label: locale.tournament.list.title,
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
    size: 5,
  },
  {
    label: locale.tournament.list.author,
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
    size: 2,
  },
  {
    label: locale.tournament.list.start,
    key: 'start',
    sortable: true,
    sortFunction: (a: any, b: any) => {
      return a.start.value > b.start.value
        ? 1
        : a.start.value == b.start.value
        ? 0
        : -1;
    },
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 4,
  },
  {
    label: locale.tournament.list.end,
    key: 'end',
    sortable: true,
    sortFunction: (a: any, b: any) => {
      return a.end.value > b.end.value
        ? 1
        : a.end.value == b.end.value
        ? 0
        : -1;
    },
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 4,
  },
];

const getTournamentIcon = (
  tournament: ITournamentDisplay
): ReactNode => {
  if (tournament.status.spec === 0) {
    return <Clock color="orange" />;
  }
  if (tournament.status.spec === 1) {
    return <Run color="var(--positive)" />;
  }
  return <Lock color="black" />;
};

const processData = (
  data: ITournamentListBundle
): {
  tournaments: ITournamentDisplayList[];
  tags: ITag[];
} => {
  const tournaments = data.tournaments.map(
    (tournament: ITournamentDisplay): any => ({
      ...tournament,
      author: {
        value: tournament.author,
        display: tournament.author,
      },
      status: {
        value: tournament.status.spec,
        display: <>{getTournamentIcon(tournament)}</>,
      },
      start: {
        value: tournament.start,
        display: <div>{getLocalDate(tournament.start)}</div>,
      },
      end: {
        value: tournament.end,
        display: <div>{getLocalDate(tournament.end)}</div>,
      },
      title: {
        value: tournament.title,
        display: (
          <div className={tableStyles.titleWrapper}>
            <a
              className={tableStyles.title}
              href={`/edu/tournament/${tournament.spec}`}
            >
              {tournament.title}
            </a>
            {tournament.tags.length > 0 && (
              <span className={tableStyles.tags}>
                {tournament.tags.map((tag, idx) => (
                  <div className={tableStyles.tag} key={idx}>
                    {tag.title +
                      (idx == tournament.tags.length - 1 ? '' : ', ')}
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
  return { tournaments, tags };
};

const defaultOnPage = 10;

function TournamentList() {
  const { locale } = useLocale();

  const [list, setList] = useState<ITournamentDisplayList[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);

  const [total, setTotal] = useState(0);

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

  const { data, loading } = useRequest<
    {},
    ITournamentListBundle,
    {
      tournaments: ITournamentDisplayList[];
      tags: ITag[];
    }
  >('tournament/list', 'GET', undefined, processData);

  const applyFilters = useCallback(
    (data: ITournamentDisplayList[]) => {
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

      setTotal(sorted.length);

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
      applyFilters(data.tournaments);
      setTags(data.tags);
    }
  }, [data, applyFilters]);

  return (
    <div>
      <Title title={locale.titles.tournament.list} />
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
        total={total}
        empty={<>{locale.ui.table.emptyMessage}</>}
        isEmpty={data?.tournaments.length == 0}
        nothingFound={<>{locale.ui.table.nothingFoundMessage}</>}
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
        href={`/edu/tournament/add`}
        icon={<Plus height={25} width={25} />}
      />
    </div>
  );
}

TournamentList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TournamentList;
