import { removeOneElement } from '@utils/removeOneElement';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { SelectField } from './SelectField/SelectField';
import styles from './customTransferList.module.css';
import { pureCallback, setter } from '@custom-types/ui/atomic';

export interface Item {
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
  classNames: any;
  rightComponent?: pureCallback<ReactNode>;
  itemComponent: (_: any, __: any) => ReactNode;
  shouldSortChosen?: boolean;
  searchKeys?: string[];
  shrink?: boolean;
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
  shrink,
}) => {
  const [chosen, setChosen] = useState(
    shouldSortChosen ? defaultChosen.sort(cmpItem) : defaultChosen
  );
  const [options, setOptions] = useState(
    defaultOptions.sort(cmpItem)
  );

  useEffect(() => {
    setOptions(defaultOptions.sort(cmpItem));
  }, [defaultOptions]);

  useEffect(() => {
    setChosen(
      shouldSortChosen ? defaultChosen.sort(cmpItem) : defaultChosen
    );
  }, [defaultChosen, defaultOptions, shouldSortChosen]);

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
    <div
      className={`${styles.wrapper} ${
        classNames?.customTransferListWrapper
          ? classNames.customTransferListWrapper
          : ''
      }  ${shrink ? styles.shrink : ''}`}
    >
      <div className={styles.leftWrapper}>
        <SelectField
          key={options.length}
          classNames={classNames}
          title={titles[0]}
          values={options}
          handleSelect={handleSelectLeft}
          rightComponent={rightComponent}
          itemComponent={itemComponent}
          searchKeys={searchKeys}
          shrink={shrink}
        />
      </div>
      <div className={styles.rightWrapper}>
        <SelectField
          key={chosen.length}
          classNames={classNames}
          title={titles[1]}
          values={chosen}
          handleSelect={handleSelectRight}
          itemComponent={itemComponent}
          searchKeys={searchKeys}
          shrink={shrink}
        />
      </div>
    </div>
  );
};
