import { ReactNode } from 'react';

export interface ITableColumn {
  label: string;
  key: string;
  sortable: boolean;
  sorted: -1 | 0 | 1;
  allowMiddleState: boolean;
  sortFunction: (a: any, b: any) => -1 | 0 | 1;
  hidable: boolean;
  hidden: boolean;
  size: number;
}
