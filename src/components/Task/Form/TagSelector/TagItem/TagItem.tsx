import { FC } from 'react';
import { Item } from '../CustomTransferList/CustomTransferList';
import DeleteTag from './DeleteTag/DeleteTag';
import EditTag from './EditTag/EditTag';
import styles from './tagItem.module.css';

export const TagItem: FC<{
  item: Item;
  onSelect: () => void;
  refetch: () => void;
}> = ({ item, onSelect, refetch }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item} onClick={() => onSelect()}>
        <div>{item.label}</div>
      </div>
      <div className={styles.actions}>
        <EditTag item={item} refetch={refetch} />
        <DeleteTag item={item} refetch={refetch} />
      </div>
    </div>
  );
};
