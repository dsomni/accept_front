import ListItem from '@components/ListItem/ListItem';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@mantine/core';

import { capitalize } from '@utils/capitalize';
import { FC, memo, useCallback } from 'react';
import styles from './taskTests.module.css';

const TaskTests: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const onDeleteExample = useCallback(
    (index: number) => {
      form.setFieldValue(
        'tests',
        (() => {
          form.values.tests.splice(index, 1);
          return form.values.tests;
        })()
      );
    },
    [form]
  );

  return (
    <div className={styles.wrapper}>
      {form.values.tests &&
        form.values.tests.map(
          (value: [string, string], index: number) => (
            <div key={index} className={styles.example}>
              <ListItem
                field="tests"
                label={
                  capitalize(locale.tasks.add.test) +
                  ' #' +
                  (index + 1)
                }
                InLabel={capitalize(locale.tasks.add.inputTest)}
                OutLabel={capitalize(locale.tasks.add.outputTest)}
                form={form}
                index={index}
                onDelete={onDeleteExample}
                maxRows={7}
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
            'tests',
            (() => {
              form.values.tests.push(['', '']);
              return form.values.tests;
            })()
          )
        }
      >
        +
      </Button>
    </div>
  );
};

export default memo(TaskTests);
