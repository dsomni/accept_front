import ListItem from '@components/ListItem/ListItem';
import { ITest } from '@custom-types/ITest';
import { useLocale } from '@hooks/useLocale';
import { Button, Group, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { useEventListener } from '@mantine/hooks';
import {
  ImageIcon,
  UploadIcon,
  CrossCircledIcon,
} from '@modulz/radix-icons';

import { capitalize } from '@utils/capitalize';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './tests.module.css';

const Tests: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const [drag, setDrag] = useState(false);
  const dragable = useRef<HTMLDivElement>(null);

  const dragStart = useCallback(() => {
    setDrag(true);
  }, []);
  const dragEnd = useCallback(() => {
    setDrag(false);
  }, []);

  useEffect(() => {
    const current = dragable.current;
    if (current) {
      current.addEventListener('dragenter', dragStart);
      current.addEventListener('dragleave', () => setDrag(false));
    }
    return () => {
      if (current) {
        current.removeEventListener('dragenter', dragStart);
        current.removeEventListener('dragleave', dragEnd);
      }
    };
  }, [dragable, dragStart, dragEnd]);

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
            inputData: '',
            outputData: '',
          };
        }
        for (let i = 0; i < files.length; i++) {
          if (files[i].name.startsWith('input')) {
            const input = await files[i].text();
            const index = Number(files[i].name.slice('input'.length));
            if (index >= length) continue;
            tests[index].inputData = input;
          } else if (files[i].name.startsWith('output')) {
            const output = await files[i].text();
            const index = Number(
              files[i].name.slice('output'.length)
            );
            if (index >= length) continue;
            tests[index].outputData = output;
          }
        }
        tests = tests.filter(
          (test) => test.inputData !== '' && test.outputData !== ''
        );
        if (tests !== []) form.setFieldValue('tests', tests);
      } catch {}
      setDrag(false);
    },
    [form]
  );

  return (
    <div ref={dragable} className={styles.wrapper}>
      {drag && (
        <Dropzone
          disabled={false}
          accept={['*', '']}
          onDrop={onDrop}
          onReject={(files) => {
            setDrag(false);
          }}
        >
          {(status) => (
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 220, pointerEvents: 'none' }}
            >
              <ImageUploadIcon
                status={status}
                style={{
                  width: 80,
                  height: 80,
                  color: 'white',
                }}
              />

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should
                  not exceed 5mb
                </Text>
              </div>
            </Group>
          )}
        </Dropzone>
      )}
      {!drag &&
        form.values.tests &&
        form.values.tests.map(
          (_: [string, string], index: number) => (
            <div key={index} className={styles.example}>
              <ListItem
                field="tests"
                label={
                  capitalize(locale.tasks.form.test) +
                  ' #' +
                  (index + 1)
                }
                InLabel={capitalize(locale.tasks.form.inputTest)}
                OutLabel={capitalize(locale.tasks.form.outputTest)}
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

export default memo(Tests);

function ImageUploadIcon({ ...props }) {
  const status = props.status;
  if (status.accepted) {
    return <UploadIcon {...props} />;
  }

  if (status.rejected) {
    return <CrossCircledIcon {...props} />;
  }

  return <ImageIcon {...props} />;
}
