import { pureCallback } from '@custom-types/ui/atomic';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { FC } from 'react';
import styles from './languageItem.module.css';

export const LanguageItem: FC<{
  item: Item;
  onSelect: pureCallback<void>;
}> = ({ item, onSelect }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item} onClick={() => onSelect()}>
        <div>{item.label}</div>
      </div>
    </div>
  );
};
