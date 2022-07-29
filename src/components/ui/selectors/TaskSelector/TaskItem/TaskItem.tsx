import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { FC } from 'react';
import OpenTask from './OpenTask/OpenTask';
import styles from './taskItem.module.css';
import { pureCallback } from '@custom-types/ui/atomic';

export const TaskItem: FC<{
  item: Item;
  onSelect: pureCallback<void>;
  refetch: pureCallback<void>;
}> = ({ item, onSelect, refetch }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item} onClick={() => onSelect()}>
        <div className={styles.label}>{item.label}</div>
      </div>
      <div className={styles.actions}>
        <OpenTask spec={item.value} />
      </div>
    </div>
  );
};
