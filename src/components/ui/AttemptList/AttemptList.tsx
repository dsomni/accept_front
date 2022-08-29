import {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';
import { IAttemptDisplay } from '@custom-types/data/IAttempt';
import { ILocale } from '@custom-types/ui/ILocale';
import { useUser } from '@hooks/useUser';
import { useRequest } from '@hooks/useRequest';
import { BaseSearch } from '@custom-types/data/request';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

const defaultOnPage = 10;

interface PagerResponse {
  data: IAttemptDisplay[];
  total: number;
}

interface TableData {
  data: any[];
  total: number;
}

const AttemptsList: FC<{
  url: string;
  activeTab: boolean;
  classNames?: any;
  initialColumns: (locale: ILocale) => ITableColumn[];
  refactorAttempt: (attempt: IAttemptDisplay, locale: ILocale) => any;
  noDefault?: boolean;
  empty?: ReactNode;
}> = ({
  url,
  activeTab,
  classNames,
  initialColumns,
  refactorAttempt,
  noDefault,
  empty,
}) => {
  const { locale } = useLocale();
  const { refreshAccess } = useUser();

  const columns: ITableColumn[] = useMemo(
    () => initialColumns(locale),
    [locale, initialColumns]
  );

  const [needRefetch, setNeedRefetch] = useState(true);
  const [tableData, setTableData] = useState<TableData>({
    data: [],
    total: 0,
  });

  const [searchParams, setSearchParams] = useState<BaseSearch>({
    pager: {
      skip: 0,
      limit: defaultOnPage,
    },
    sort_by: [{ field: 'date', order: -1 }],
    search_params: {
      search: '',
      keys: [],
    },
  });

  const processData = useCallback(
    (response: PagerResponse): TableData => ({
      data: response.data.map((item) =>
        refactorAttempt(item, locale)
      ),
      total: response.total,
    }),
    [locale, refactorAttempt]
  );

  const onError = useCallback(
    (res: any) => {
      if (refreshAccess() == 2) {
        setTableData({ data: [], total: 0 });
        const id = newNotification({});
        errorNotification({
          id,
          title: locale.notify.errors.unauthorized,
          autoClose: 10000,
        });
        setNeedRefetch(false);
      } else {
        setNeedRefetch(true);
      }
    },
    [locale.notify.errors.unauthorized, refreshAccess]
  );

  const { data, loading, refetch } = useRequest<
    BaseSearch,
    PagerResponse,
    TableData
  >(url, 'POST', searchParams, processData, undefined, onError);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
    if (activeTab) {
      const id = setInterval(() => {
        if (needRefetch) refetch(false);
      }, 2000);
      return () => {
        clearInterval(id);
      };
    }
  }, [needRefetch, refetch, activeTab]);

  return (
    <div>
      <Table
        columns={columns}
        rows={tableData.data}
        total={tableData.total}
        loading={loading}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        noDefault={noDefault}
        empty={empty}
        classNames={
          classNames
            ? classNames
            : {
                wrapper: tableStyles.wrapper,
                table: tableStyles.table,
                author: tableStyles.author,
                grade: tableStyles.grade,
                verdict: tableStyles.verdict,
                headerCell: tableStyles.headerCell,
                cell: tableStyles.cell,
                even: tableStyles.even,
                odd: tableStyles.odd,
              }
        }
        defaultOnPage={defaultOnPage}
        onPage={[5, 10]}
      />
    </div>
  );
};

export default memo(AttemptsList);
