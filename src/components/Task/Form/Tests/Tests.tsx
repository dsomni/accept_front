import ListItem from '@ui/ListItem/ListItem';
import { ITest } from '@custom-types/data/atomic';
import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useMemo } from 'react';
import styles from './tests.module.css';
import { Helper, InputWrapper, Dropzone, Button } from '@ui/basics';
import stepperStyles from '@styles/ui/stepper.module.css';

const Tests: FC<{
  form: any;
  hideInput?: boolean;
  hideOutput?: boolean;
}> = ({ form, hideInput, hideOutput }) => {
  const { locale } = useLocale();

  const onDeleteTest = useCallback(
    (index: number) => {
      form.setFieldValue(
        'tests',
        (() => {
          form.values.tests.splice(index, 1);
          return form.values.tests;
        })()
      );
      form.validateField('tests');
    },
    [form]
  );

  const onDrop = useCallback(
    async (files: File[]) => {
      if (files === []) return;
      const length = files.length;
      var inputs: { content: string; index: number }[] = [];
      var outputs: {
        content: string;
        index: number;
      }[] = [];
      for (let i = 0; i < length; i++) {
        const name = files[i].name.startsWith('input')
          ? 'input'
          : files[i].name.startsWith('output')
          ? 'output'
          : '';
        switch (name) {
          case 'input':
            inputs.push({
              index: +files[i].name.slice(
                5,
                files[i].name.lastIndexOf('.')
              ),
              content: await files[i].text(),
            });
            break;

          case 'output':
            outputs.push({
              index: +files[i].name.slice(
                6,
                files[i].name.lastIndexOf('.')
              ),
              content: await files[i].text(),
            });
            break;
          default:
            continue;
        }
      }

      inputs.sort((a, b) => a.index - b.index);
      outputs.sort((a, b) => a.index - b.index);

      var tests: ITest[] = [];
      if (
        form.values.checkType == '0' &&
        form.values.taskType == '0'
      ) {
        // tests and code
        for (
          let i = 0;
          i < Math.min(inputs.length, outputs.length);
          i++
        ) {
          if (inputs[i].index != i || outputs[i].index != i) break;
          tests.push({
            inputData: inputs[i].content,
            outputData: outputs[i].content,
          });
        }
      } else if (form.values.taskType == '1') {
        // text task
        for (let i = 0; i < outputs.length; i++) {
          if (outputs[i].index != i) break;
          tests.push({
            inputData: '',
            outputData: outputs[i].content,
          });
        }
      } else if (form.values.checkType == '1') {
        // checker
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].index != i) break;
          tests.push({
            inputData: inputs[i].content,
            outputData: '',
          });
        }
      }

      if (tests !== []) form.setFieldValue('tests', tests);
    },
    [form]
  );

  const helperContent = useMemo(
    () => (
      <div>
        {locale.helpers.dropzone.test.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    ),
    [locale]
  );

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        title={locale.ui.codeArea.dragFiles}
        description={''}
        showButton
        buttonProps={{
          style: {
            width: '100%',
          },
          targetWrapperStyle: { margin: 'var(--spacer-s) 0' },
          dropdownContent: helperContent,
        }}
      >
        <div className={styles.inner}>
          {form.values.tests.length == 0 && (
            <div className={styles.empty}>
              {locale.task.form.emptyTests}
              <Helper dropdownContent={helperContent} />
            </div>
          )}
          {form.values.tests.length > 0 &&
            form.values.tests.map(
              (_: [string, string], index: number) => (
                <div key={index} className={stepperStyles.example}>
                  <ListItem
                    field="tests"
                    label={locale.task.form.test + ' #' + (index + 1)}
                    InLabel={locale.task.form.inputTest}
                    OutLabel={locale.task.form.outputTest}
                    form={form}
                    hideInput={
                      hideInput || form.values.taskType == '1'
                    }
                    hideOutput={hideOutput}
                    index={index}
                    onDelete={onDeleteTest}
                    maxRows={7}
                  />
                </div>
              )
            )}
          {form.errors.tests && (
            <InputWrapper
              {...form.getInputProps('tests')}
              onChange={() => {}}
              styles={{ error: { fontSize: 'var(--font-size-m)' } }}
            />
          )}
          <Button
            hoverCardDropdownProps={{ style: { width: '100%' } }}
            size="lg"
            className={stepperStyles.addButton}
            color="var(--primary)"
            variant="light"
            onClick={() => {
              form.setFieldValue(
                'tests',
                (() => {
                  form.values.tests.push({
                    inputData: '',
                    outputData: '',
                  });
                  return form.values.tests;
                })()
              );
              form.validateField('tests');
            }}
          >
            +
          </Button>
        </div>
      </Dropzone>
    </>
  );
};

export default memo(Tests);
