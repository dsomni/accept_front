import { ActionIcon, Input } from '@mantine/core';
import { FC, useCallback, useEffect, useState } from 'react';
import styles from './customTransferList.module.css';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@modulz/radix-icons';
import { removeOneElement } from '@utils/remove';
import { ItemComponent } from '../ItemComponent/ItemComponent';

export interface Item {
  value: string;
  label: string;
  checked?: boolean;
}

export type TransferListData = [Item[], Item[]];

export const CustomTransferList: FC<{
  value: TransferListData;
  onChange: (_: TransferListData) => void;
  titles: [string, string];
}> = ({ value, onChange, titles }) => {
  const [localValue, setLocalValue] =
    useState<TransferListData>(value);
  let selectedLeft: Item[] = [];
  let selectedRight: Item[] = [];

  const handleLeftMove = useCallback(() => {
    const newLeft = value[0]
      .filter((item) => !selectedLeft.includes(item))
      .map((item) => ({ ...item, checked: false }));
    const newRight = value[1]
      .concat(selectedLeft)
      .map((item) => ({ ...item, checked: false }));

    onChange([newLeft, newRight]);
  }, [onChange, value]);

  const handleRightMove = useCallback(() => {
    const newRight = value[1]
      .filter((item) => !selectedRight.includes(item))
      .map((item) => ({ ...item, checked: false }));
    const newLeft = value[0]
      .concat(selectedRight)
      .map((item) => ({ ...item, checked: false }));

    onChange([newLeft, newRight]);
  }, [onChange, value]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <div className={styles.title}>{titles[0]}</div>
        <div className={styles.header}>
          <div className={styles.searchBar}>
            <Input />
          </div>
          <ActionIcon
            onClick={() => {
              handleLeftMove();
            }}
            className={styles.move}
            tabIndex={5}
            color="blue"
            variant="hover"
            size="lg"
          >
            <ChevronRightIcon width={20} height={20} />
          </ActionIcon>
        </div>
        <div className={styles.content}>
          {value[0].map((item, index) => (
            <ItemComponent
              key={index}
              item={item}
              onSelect={(checked: boolean) => {
                if (checked) {
                  selectedLeft.push(item);
                } else {
                  removeOneElement(selectedLeft, item);
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.title}>{titles[1]}</div>
        <div className={styles.header}>
          <ActionIcon
            onClick={() => {
              handleRightMove();
            }}
            className={styles.move}
            tabIndex={5}
            color="blue"
            variant="hover"
            size="lg"
          >
            <ChevronLeftIcon width={20} height={20} />
          </ActionIcon>
          <div className={styles.searchBar}>
            <Input />
          </div>
        </div>
        <div className={styles.content}>
          {value[1].map((item, index) => (
            <ItemComponent
              key={index}
              item={item}
              onSelect={(checked: boolean) => {
                if (checked) {
                  selectedRight.push(item);
                } else {
                  selectedRight = removeOneElement(
                    selectedRight,
                    item
                  );
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
