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
}
export type TransferListData = [Item[], Item[]];

const difference = (a1: any[], a2: any[]): any[] =>
  a1.filter((x) => !a2.includes(x));

export const CustomTransferList: FC<{
  value: TransferListData;
  onChange: (_: TransferListData) => void;
  titles: [string, string];
}> = ({ value, onChange, titles }) => {
  const [valueLeft, setValueLeft] = useState(value[0]);
  const [valueRight, setValueRight] = useState(value[1]);

  const [selectedLeft, setSelectedLeft] = useState<Item[]>([]);
  const [selectedRight, setSelectedRight] = useState<Item[]>([]);

  const handleLeftMove = useCallback(() => {
    setValueLeft((valueLeft) => difference(valueLeft, selectedLeft));
    setValueRight((valueRight) => valueRight.concat(selectedLeft));
    setSelectedLeft([]);
  }, [selectedLeft]);

  const handleLRightMove = useCallback(() => {
    setValueRight((valueRight) =>
      difference(valueRight, selectedRight)
    );
    setValueLeft((valueLeft) => valueLeft.concat(selectedRight));
    setSelectedRight([]);
  }, [selectedRight]);

  const selectLeft = useCallback(
    (item) => {
      const isSelected = selectedLeft.includes(item);
      if (!isSelected) {
        setSelectedLeft((selectedLeft) => {
          selectedLeft.push(item);
          return selectedLeft;
        });
      } else {
        setSelectedLeft(removeOneElement(selectedLeft, item));
      }
    },
    [selectedLeft]
  );

  const selectRight = useCallback(
    (item) => {
      const isSelected = selectedRight.includes(item);
      if (!isSelected) {
        setSelectedRight((selectedRight) => {
          selectedRight.push(item);
          return selectedRight;
        });
      } else {
        setSelectedRight(removeOneElement(selectedRight, item));
      }
    },
    [selectedRight]
  );

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
          {valueLeft.map((item, index) => (
            <ItemComponent
              key={index}
              item={item}
              onSelect={selectLeft}
            />
          ))}
        </div>
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.title}>{titles[1]}</div>
        <div className={styles.header}>
          <ActionIcon
            onClick={() => {
              handleLRightMove();
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
          {valueRight.map((item, index) => (
            <ItemComponent
              key={index}
              item={item}
              onSelect={selectRight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
