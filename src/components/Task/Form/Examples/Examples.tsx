import ListItem from '@ui/ListItem/ListItem';
import { ITest } from '@custom-types/data/atomic';
import { useLocale } from '@hooks/useLocale';
import { Button, InputWrapper } from '@ui/basics';

import { FC, memo, useCallback } from 'react';
import styles from './examples.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';

const Examples: FC<{ form: any }> = ({ form }) => {
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
      form.validateField('examples');
    },
    [form]
  );

  return (
    <>
      {form.values.examples &&
        form.values.examples.map((_: ITest, index: number) => (
          <div key={index}>
            <ListItem
              field="examples"
              label={locale.task.form.example + ' #' + (index + 1)}
              InLabel={locale.task.form.inputExample}
              OutLabel={locale.task.form.outputExample}
              form={form}
              index={index}
              onDelete={onDeleteExample}
            />
          </div>
        ))}
      {form.errors.examples && (
        <InputWrapper
          {...form.getInputProps('examples')}
          onChange={() => {}}
          styles={{ error: { fontSize: 'var(--font-size-m)' } }}
        />
      )}
      <Button
        size="lg"
        className={stepperStyles.addButton}
        variant="light"
        onClick={() => {
          form.setFieldValue(
            'examples',
            (() => {
              form.values.examples.push({
                inputData: '',
                outputData: '',
              });
              return form.values.examples;
            })()
          );
          form.validateField('examples');
        }}
      >
        +
      </Button>
    </>
  );
};

export default memo(Examples);
