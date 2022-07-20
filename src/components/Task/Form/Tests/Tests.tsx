import ListItem from '@ui/ListItem/ListItem';
import { ITest } from '@custom-types/data/atomic';
import { useLocale } from '@hooks/useLocale';
import Button from '@ui/Button/Button';
import Dropzone from '@ui/Dropzone/Dropzone';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './tests.module.css';
import InputWrapper from '@ui/InputWrapper/InputWrapper';

const Tests: FC<{
  form: any;
  hideInput?: boolean;
  hideOutput?: boolean;
}> = ({ form, hideInput, hideOutput }) => {
  const { locale } = useLocale();

  const [drag, setDrag] = useState(false);
  const draggable = useRef<HTMLDivElement>(null);

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
      try {
        if (files === []) return;

        let length = files.length;
        if (length % 2 !== 0) length++;
        length = length / 2;

        let tests: ITest[] = new Array(length);
        for (let i = 0; i < length; i++) {
          tests[i] = {
            spec: i.toString(),
            inputData: '',
            outputData: '',
          };
        }
        for (let i = 0; i < files.length; i++) {
          if (files[i].name.startsWith('input')) {
            const input = await files[i].text();
            const index = +files[i].name.slice('input'.length);
            if (index >= length) continue;
            tests[index].inputData = input;
          } else if (files[i].name.startsWith('output')) {
            const output = await files[i].text();
            const index = +files[i].name.slice('output'.length);
            if (index >= length) continue;
            tests[index].outputData = output;
          }
        }
        tests = tests.filter(
          (test) => test.inputData !== '' && test.outputData !== ''
        );
        if (tests !== []) form.setFieldValue('tests', tests);
      } catch {}
    },
    [form]
  );

  return (
    <Dropzone
      onDrop={onDrop}
      setDrag={setDrag}
      title={locale.ui.codeArea.dragFiles}
      description={''}
    >
      <div className={styles.wrapper}>
        {form.values.tests &&
          form.values.tests.map(
            (_: [string, string], index: number) => (
              <div key={index} className={styles.example}>
                <ListItem
                  field="tests"
                  label={locale.task.form.test + ' #' + (index + 1)}
                  InLabel={locale.task.form.inputTest}
                  OutLabel={locale.task.form.outputTest}
                  form={form}
                  hideInput={hideInput || form.values.taskType == '1'}
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
          size="lg"
          className={styles.addButton}
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
  );
};

export default memo(Tests);
