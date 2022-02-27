import ListItem from '@components/ListItem/ListItem';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@mantine/core';

import { capitalize } from '@utils/capitalize';
import { FC, memo, useCallback } from 'react';
import styles from './taskExamples.module.css';

const TaskExamples: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const onDeleteExample = useCallback(
    (index: number) => {
      form.setFieldValue(
        'examples',
        (() => {
          form.values.examples.splice(index, 1);
          return form.values.examples;
        })()
      );
    },
    [form]
  );

  return (
    <div className={styles.wrapper}>
      {form.values.examples &&
        form.values.examples.map(
          (value: [string, string], index: number) => (
            <div key={index} className={styles.example}>
              <ListItem
                field="examples"
                label={
                  capitalize(locale.tasks.add.example) +
                  ' #' +
                  (index + 1)
                }
                InLabel={capitalize(locale.tasks.add.inputExample)}
                OutLabel={capitalize(locale.tasks.add.outputExample)}
                form={form}
                index={index}
                onDelete={onDeleteExample}
              />
            </div>
          )
        )}
      <Button
        size="lg"
        className={styles.addButton}
        color="blue"
        variant="light"
        onClick={() =>
          form.setFieldValue(
            'examples',
            (() => {
              form.values.examples.push(['', '']);
              return form.values.examples;
            })()
          )
        }
      >
        +
      </Button>
    </div>
  );
};

export default memo(TaskExamples);
