import {
  ActionIcon,
  Checkbox,
  TransferListItem,
} from '@mantine/core';
import { TrashIcon, Pencil1Icon } from '@modulz/radix-icons';
import { FC, useEffect, useState } from 'react';
import { Item } from '../CustomTransferList/CustomTransferList';
import styles from './itemComponent.module.css';

export const ItemComponent: FC<{
  item: Item;
  onSelect: (_: Item) => void;
}> = ({ item, onSelect }) => {
  useEffect(() => {
    console.log(item.label);
  }, [item]);

  return (
    <div className={styles.itemWrapper}>
      <div
        className={styles.item}
        onClick={() => {
          onSelect(item);
        }}
      >
        <Checkbox
          checked={false}
          onChange={() => {}}
          tabIndex={-1}
          sx={{ pointerEvents: 'none' }}
        />
        <div>{item.label}</div>
      </div>
      <div className={styles.actions}>
        <ActionIcon
          onClick={() => {}}
          tabIndex={5}
          color="blue"
          variant="hover"
          size="lg"
        >
          <Pencil1Icon width={20} height={20} />
        </ActionIcon>
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
