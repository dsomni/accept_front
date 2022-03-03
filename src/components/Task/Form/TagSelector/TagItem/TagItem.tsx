import { ActionIcon, TransferListItem } from '@mantine/core';
import { TrashIcon, Pencil1Icon } from '@modulz/radix-icons';
import { FC, useEffect, useState } from 'react';
import { Item } from '../CustomTransferList/CustomTransferList';
import EditTag from './EditTag/EditTag';
import styles from './tagItem.module.css';

export const TagItem: FC<{
  item: Item;
  onSelect: () => void;
}> = ({ item, onSelect }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item} onClick={() => onSelect()}>
        <div>{item.label}</div>
      </div>
      <div className={styles.actions}>
        <EditTag item={item} />
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
