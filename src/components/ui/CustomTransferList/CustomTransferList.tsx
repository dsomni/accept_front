import { removeOneElement } from '@utils/removeOneElement';
import { FC, ReactNode, useCallback, useState } from 'react';
import { SelectField } from './SelectField/SelectField';
import styles from './customTransferList.module.css';
import { setter, pureCallback } from '@custom-types/ui/atomic';

export interface Item<T = any> {
  label: string;
  [key: string]: any;
}
export type TransferListData = [Item[], Item[]];

const cmpItem = (a: Item, b: Item) => {
  if (a.label === b.label) {
    return 0;
  }
  if (a.label > b.label) {
    return 1;
  }
  return -1;
};

export const CustomTransferList: FC<{
  defaultOptions: Item[];
  defaultChosen: Item[];
  setUsed: setter<Item[]>;
  titles: [string, string];
  classNames: object;
  rightComponent?: pureCallback<ReactNode>;
  itemComponent: (item: any, onSelect: any) => ReactNode;
  shouldSortChosen?: boolean;
  searchKeys?: string[];
}> = ({
  defaultOptions,
  defaultChosen,
  setUsed,
  titles,
  classNames,
  rightComponent,
  itemComponent,
  shouldSortChosen,
  searchKeys,
}) => {
  const [chosen, setChosen] = useState(
    shouldSortChosen ? defaultChosen.sort(cmpItem) : defaultChosen
  );
  const [options, setOptions] = useState(
    defaultOptions.sort(cmpItem)
  );

  const handleSelectLeft = useCallback(
    (item: Item) => {
      setOptions((options) => {
        return removeOneElement(options, item);
      });
      setChosen((chosen) => {
        chosen.push(item);
        if (shouldSortChosen) return chosen.sort(cmpItem);
        return chosen;
      });

      setUsed(chosen);
    },
    [chosen, setUsed, shouldSortChosen]
  );
  const handleSelectRight = useCallback(
    (item: Item) => {
      setChosen((chosen) => {
        return removeOneElement(chosen, item);
      });
      setOptions((options) => {
        options.push(item);
        return options.sort(cmpItem);
      });
      setUsed(chosen);
    },
    [chosen, setUsed]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <SelectField
          classNames={classNames}
          title={titles[0]}
          values={options}
          handleSelect={handleSelectLeft}
          rightComponent={rightComponent}
          itemComponent={itemComponent}
          searchKeys={searchKeys}
        />
      </div>
      <div className={styles.rightWrapper}>
        <SelectField
          classNames={classNames}
          title={titles[1]}
          values={chosen}
          handleSelect={handleSelectRight}
          itemComponent={itemComponent}
          searchKeys={searchKeys}
        />
      </div>
    </div>
  );
};
