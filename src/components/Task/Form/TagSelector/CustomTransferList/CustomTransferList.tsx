import { removeOneElement } from '@utils/removeOneElement';
import { FC, useCallback, useState } from 'react';
import { SelectField } from '../SelectField/SelectField';
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

export const CustomTransferList: FC<{
  value: TransferListData;
  onChange: (_: Item[]) => void;
  titles: [string, string];
}> = ({ value, onChange, titles }) => {
  const [options, setOptions] = useState(value[0].sort());
  const [chosen, setChosen] = useState(value[1].sort());

  const handleSelectLeft = useCallback(
    (item: Item) => {
      setOptions((options) => {
        return removeOneElement(options, item);
      });
      setChosen((chosen) => {
        chosen.push(item);
        return chosen.sort(cmpItem);
      });
      onChange(chosen.sort(cmpItem));
    },
    [onChange, chosen]
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
      onChange(chosen.sort(cmpItem));
    },
    [onChange, chosen]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <SelectField
          title={titles[0]}
          values={options}
          handleSelect={handleSelectLeft}
        />
      </div>
      <div className={styles.rightWrapper}>
        <SelectField
          title={titles[1]}
          values={chosen}
          handleSelect={handleSelectRight}
        />
      </div>
    </div>
  );
};
