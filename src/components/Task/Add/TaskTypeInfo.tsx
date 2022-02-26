import { useLocale } from '@hooks/useLocale';
import { Button, Switch, Textarea } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';
import styles from './typeInfo.module.css';

const TaskTypeInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  return (
    <div className={styles.wrapper}>
      <Switch
        label={capitalize(locale.tasks.add.isChecker)}
        {...form.getInputProps('isChecker')}
      />
      {form.values.examples &&
        form.values.examples.map((value: string[], index: number) => (
          <div key={index} className={styles.example}>
            <Textarea
              className={styles.exampleInput}
              label={capitalize(locale.tasks.add.inputExample)}
            >
              {value[0]}
            </Textarea>
            <Textarea
              className={styles.exampleInput}
              label={capitalize(locale.tasks.add.outputExample)}
            >
              {value[1]}
            </Textarea>
          </div>
        ))}
      <Button
        color="green"
        variant="subtle"
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

export default memo(TaskTypeInfo);
