import { removeOneElement } from '@utils/removeOneElement';
import { FC, useCallback } from 'react';
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
  options: Item[];
  chosen: Item[];
  setOptions: (_: callback) => void;
  setChosen: (_: callback) => void;
  setUsed: (_: Item[]) => void;
  titles: [string, string];
  refetch: () => void;
  classNames: object;
}> = ({
  options,
  chosen,
  setOptions,
  setChosen,
  setUsed,
  titles,
  refetch,
  classNames,
}) => {
  const handleSelectLeft = useCallback(
    (item: Item) => {
      setOptions((options) => {
        return removeOneElement(options, item);
      });
      setChosen((chosen) => {
        chosen.push(item);
        return chosen.sort(cmpItem);
      });
      setUsed(chosen);
    },
    [chosen, setUsed, setChosen, setOptions]
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
    [chosen, setUsed, setChosen, setOptions]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <SelectField
          classNames={classNames}
          title={titles[0]}
          values={options}
          handleSelect={handleSelectLeft}
          refetch={refetch}
          displayAdd
        />
      </div>
      <div className={styles.rightWrapper}>
        <SelectField
          classNames={classNames}
          title={titles[1]}
          values={chosen}
          handleSelect={handleSelectRight}
          refetch={refetch}
        />
      </div>
    </div>
  );
};
