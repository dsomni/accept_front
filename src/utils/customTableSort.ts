import { SortBy } from '@custom-types/data/request';
import { ITableColumn } from '@custom-types/ui/ITable';

export const customTableSort = (
  a: any,
  b: any,
  sort_by: SortBy[],
  columns: ITableColumn[]
) => {
  var res = 0;
  for (let i = 0; i < sort_by.length; i++) {
    res =
      (columns
        .find((item) => item.key == sort_by[i].field)
        ?.sortFunction(a, b) || 0) * sort_by[i].order;
    if (Math.abs(res) !== 0) break;
  }
  return res;
};
