import { callback } from '@custom-types/ui/atomic';
import { ActionIcon, Textarea } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { FC, memo } from 'react';
import OpenTextInNewTab from '@ui/OpenTextInNewTab/OpenTextInNewTab';
import styles from './listItem.module.css';

const ListItem: FC<{
  label: string;
  InLabel: string;
  OutLabel: string;
  form: any;
  index: number;
  field: string;
  maxRows?: number;
  minRows?: number;
  hideInput?: boolean;
  hideOutput?: boolean;
  onDelete?: callback<number, void>;
  readonly?: boolean;
  classNames?: any;
}> = ({
  label,
  InLabel,
  hideInput,
  hideOutput,
  maxRows,
  minRows,
  OutLabel,
  index,
  onDelete,
  form,
  field,
  readonly,
  classNames,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.globalLabel}>{label}</div>
      <div className={styles.example}>
        {!hideInput && (
          <Textarea
            size="lg"
            className={styles.exampleInput}
            autosize
            label={
              <div className={styles.label + ' ' + classNames?.label}>
                {InLabel}
                {onDelete && (
                  <ActionIcon
                    onClick={() => onDelete(index)}
                    color="red"
                    variant="transparent"
                    size="lg"
                  >
                    <Trash width={22} height={22} />
                  </ActionIcon>
                )}
                <OpenTextInNewTab
                  text={form.values[field][index]['inputData']}
                />
              </div>
            }
            minRows={minRows || 2}
            maxRows={maxRows}
            value={form.values[field][index]['inputData']}
            onBlur={() =>
              readonly ? undefined : form.validateField(field)
            }
            onChange={
              readonly
                ? undefined
                : (e) => {
                    form.values[field][index]['inputData'] =
                      e.target.value;
                    form.setFieldValue(field, form.values[field]);
                  }
            }
          />
        )}
        {!hideOutput && (
          <Textarea
            size="lg"
            autosize
            className={styles.exampleInput}
            label={
              <div className={styles.label + ' ' + classNames?.label}>
                {OutLabel}
                {onDelete && hideInput && (
                  <ActionIcon
                    onClick={() => onDelete(index)}
                    color="red"
                    variant="transparent"
                    size="lg"
                  >
                    <Trash width={22} height={22} />
                  </ActionIcon>
                )}
                <OpenTextInNewTab
                  text={form.values[field][index]['outputData']}
                />
              </div>
            }
            minRows={minRows || 2}
            maxRows={maxRows}
            value={form.values[field][index]['outputData']}
            onBlur={
              readonly ? undefined : () => form.validateField(field)
            }
            onChange={
              readonly
                ? undefined
                : (e) => {
                    form.values[field][index]['outputData'] =
                      e.target.value;
                    form.setFieldValue(field, form.values[field]);
                  }
            }
          />
        )}
      </div>
    </div>
  );
};

export default memo(ListItem);
