import { pureCallback } from '@custom-types/ui/atomic';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { FC } from 'react';
import DeleteTag from './DeleteTag/DeleteTag';
import EditTag from './EditTag/EditTag';
import styles from './tagItem.module.css';

export const TagItem: FC<{
  item: Item;
  onSelect: pureCallback<void>;
  refetch: pureCallback<void>;
  updateURL: string;
  deleteURL: string;
}> = ({ item, onSelect, refetch, updateURL, deleteURL }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item} onClick={() => onSelect()}>
        <div>{item.label}</div>
      </div>
      <div className={styles.actions}>
        <EditTag
          item={item}
          refetch={refetch}
          updateURL={updateURL}
        />
        <DeleteTag
          item={item}
          refetch={refetch}
          deleteURL={deleteURL}
        />
      </div>
    </div>
  );
};
