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
  classNames?: any;
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
  classNames,
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
            <div className={styles.label + ' ' + classNames?.label}>
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
          value={form.values[field][index]['inputData']}
          onChange={(e) => {
            form.values[field][index]['inputData'] = e.target.value;
            form.setFieldValue(field, form.values[field]);
          }}
        />
        {!single && (
          <Textarea
            size="lg"
            autosize
            className={styles.exampleInput}
            label={
              <div className={styles.label + ' ' + classNames?.label}>
                {OutLabel}
              </div>
            }
            minRows={2}
            maxRows={maxRows}
            value={form.values[field][index]['outputData']}
            onChange={(e) => {
              form.values[field][index]['outputData'] =
                e.target.value;
              form.setFieldValue(field, form.values[field]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default memo(ListItem);
