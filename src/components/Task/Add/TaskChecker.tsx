import ListItem from '@components/ListItem/ListItem';
import { useLocale } from '@hooks/useLocale';
import { Button, Textarea } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';
import styles from './taskChecker.module.css';

const TaskChecker: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.wrapper}>
      <Textarea
        className={styles.codeArea}
        placeholder={capitalize(locale.placeholders.code)}
        minRows={20}
        maxRows={60}
        size="lg"
        label={capitalize(locale.tasks.add.checker)}
        {...form.getInputProps('checker')}
      />
      <div className={styles.listWrapper}>
        {form.values.tests &&
          form.values.tests.map(
            (value: [string, string], index: number) => (
              <div key={index}>
                <ListItem
                  label={
                    capitalize(locale.tasks.add.test) +
                    ' #' +
                    (index + 1)
                  }
                  field="tests"
                  InLabel={capitalize(locale.tasks.add.inputTest)}
                  OutLabel={capitalize(locale.tasks.add.outputTest)}
                  form={form}
                  index={index}
                  onDelete={() => {}}
                  maxRows={7}
                  single
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
    </div>
  );
};

export default memo(TaskChecker);
