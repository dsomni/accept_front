import { callback, setter } from '@custom-types/atomic';
import { MultiSelect } from '@mantine/core';
import { hasSubarray } from '@utils/hasSubarray';
import { FC, memo, useMemo } from 'react';
import styles from './multiSearch.module.css';

const MultiSearch: FC<{
  setterFunc: setter;
  beforeSelect: any;
  items: any;
  setCurrentItems: setter<any>;
  rowList: any[];

  placeholder: string;
  displayData: callback;
  getCmpValues: callback<any, string[]>;
}> = ({
  setterFunc,
  beforeSelect,
  items,
  setCurrentItems,
  rowList,

  placeholder,
  displayData,
  getCmpValues,
}) => {
  const displayItems = useMemo(
    () => displayData(items),
    [items, displayData]
  );
  return (
    <div className={styles.selectWrapper}>
      <MultiSelect
        searchable
        classNames={{
          value: styles.selected,
          input: styles.inputElem,
        }}
        data={displayItems}
        onChange={(value: string[]) => {
          beforeSelect();
          setCurrentItems(value);
          if (value.length > 0) {
            setterFunc(() =>
              rowList.filter((row) =>
                hasSubarray(getCmpValues(row), value)
              )
            );
          } else {
            setterFunc(() => rowList);
          }
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default memo(MultiSearch);
