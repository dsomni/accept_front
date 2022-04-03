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

export interface Item {
  value: string;
  label: string;
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

type callback = (_: Item[]) => Item[];

export const CustomTransferList: FC<{
  defaultOptions: Item[];
  defaultChosen: Item[];
  setUsed: (_: Item[]) => void;
  titles: [string, string];
  classNames: object;
  rightComponent?: () => ReactNode;
  itemComponent: (item: any, onSelect: any) => ReactNode;
  shouldSortChosen?: boolean;
}> = ({
  defaultOptions,
  defaultChosen,
  setUsed,
  titles,
  classNames,
  rightComponent,
  itemComponent,
  shouldSortChosen,
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
        />
      </div>
      <div className={styles.rightWrapper}>
        <SelectField
          classNames={classNames}
          title={titles[1]}
          values={chosen}
          handleSelect={handleSelectRight}
          itemComponent={itemComponent}
        />
      </div>
    </div>
  );
};
