import { ActionIcon } from '@mantine/core';
import { TrashIcon } from '@modulz/radix-icons';
import { FC } from 'react';
import { Item } from '../CustomTransferList/CustomTransferList';
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
        <ActionIcon
          onClick={() => {}}
          tabIndex={5}
          color="red"
          variant="hover"
          size="lg"
        >
          <TrashIcon width={20} height={20} />
        </ActionIcon>
      </div>
    </div>
  );
};
