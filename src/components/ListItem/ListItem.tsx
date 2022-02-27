import { ActionIcon, Textarea } from '@mantine/core';
import { TrashIcon } from '@modulz/radix-icons';
import { FC, memo } from 'react';
import styles from './listItem.module.css';

const ListItem: FC<{
  label: string;
  InLabel: string;
  OutLabel: string;
  form: any;
  index: number;
  field: string;
  maxRows?: number;
  single?: boolean;
  onDelete: (index: number) => void;
}> = ({
  label,
  InLabel,
  single,
  maxRows,
  OutLabel,
  index,
  onDelete,
  form,
  field,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.globalLabel}>{label}</div>
      <div className={styles.example}>
        <Textarea
          size="lg"
          className={styles.exampleInput}
          autosize
          label={
            <div className={styles.label}>
              {InLabel}
              <ActionIcon
                onClick={() => onDelete(index)}
                color="red"
                variant="hover"
                size="lg"
              >
                <TrashIcon width={22} height={22} />
              </ActionIcon>
            </div>
          }
          minRows={2}
          maxRows={maxRows}
          value={form.values[field][index][0]}
          onChange={(e) => {
            form.values[field][index][0] = e.target.value;
            form.setFieldValue(field, form.values[field]);
          }}
        />
        {!single && (
          <Textarea
            size="lg"
            autosize
            className={styles.exampleInput}
            label={<div className={styles.label}>{OutLabel}</div>}
            minRows={2}
            maxRows={maxRows}
            value={form.values[field][index][1]}
            onChange={(e) => {
              form.values[field][index][1] = e.target.value;
              form.setFieldValue(field, form.values[field]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default memo(ListItem);
