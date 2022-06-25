import {
  createContext,
  useState,
  useContext,
  useCallback,
  FC,
  ReactNode,
  useEffect,
} from 'react';
import { BaseSearch } from '@custom-types/data/request';

export interface ITableStoreContext {
  data: any[];
  setData: any;
  searchParams: BaseSearch;
  setSearchParams: any;
  loading: boolean;
  setLoading: any;
}
const TableStoreContext = createContext<ITableStoreContext>(null!);

export const TableStoreProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const setData = useCallback((data: any) => {
    setValue((prev) => {
      return {
        ...prev,
        data,
      };
    });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setValue((prev) => {
      return {
        ...prev,
        loading,
      };
    });
  }, []);

  const setSearchParams = useCallback(
    (callback: (params: BaseSearch) => BaseSearch) => {
      setValue((prev) => ({
        ...prev,
        searchParams: callback(prev.searchParams),
      }));
    },
    []
  );

  const [value, setValue] = useState<ITableStoreContext>(() => ({
    data: [[], 0],
    setData,
    setSearchParams,
    searchParams: {
      pager: {
        skip: 0,
        limit: 0,
      },
      search_params: {
        search: '',
        keys: [],
      },
      sort_by: [],
    },
    loading: true,
    setLoading,
  }));

  return (
    <TableStoreContext.Provider value={value}>
      {children}
    </TableStoreContext.Provider>
  );
};

export function useTableStore() {
  return useContext(TableStoreContext);
}
