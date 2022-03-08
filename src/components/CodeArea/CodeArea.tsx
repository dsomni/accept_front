import { Group, Text } from '@mantine/core';
import {
  ImageIcon,
  UploadIcon,
  CrossCircledIcon,
} from '@modulz/radix-icons';
import { FC, memo, useCallback, useState } from 'react';
import { Textarea } from '@mantine/core';
import { FullScreenDropzone } from '@mantine/dropzone';
import { useLocale } from '@hooks/useLocale';
import styles from './codeArea.module.css';
import { capitalize } from '@utils/capitalize';
import ProgrammingLangSelector from '@components/Task/ProgrammingLangSelector/ProgrammingLangSelector';

const languages = [
  {
    value: 'cpp',
    label: 'C++',
    type: 'text/x-c++src',
  },
  {
    value: 'py',
    label: 'Python',
    type: 'text/x-python',
  },
  {
    value: 'rs',
    label: 'Rust',
    type: 'text/rust',
  },
];

const CodeArea: FC<{
  label: string;
  setLanguage: (_: string) => void;
  setCode: (_: string) => void;
  formProps?: any;
  classNames?: object;
}> = ({ label, setLanguage, setCode, formProps, classNames }) => {
  const { locale } = useLocale();

  const onDrop = useCallback(
    (files: File[]) => {
      if (files[0]) {
        const language = languages.find(
          (item) => item.type === files[0].type
        );
        if (language) {
          setLanguage(language.value);
        }
        files[0].text().then((res) => setCode(res));
      }
    },
    [setCode, setLanguage]
  );

  return (
    <div>
      <div className={styles.langSelector}>
        <ProgrammingLangSelector setValue={setLanguage} />
      </div>
      <Textarea
        classNames={classNames}
        placeholder={capitalize(locale.placeholders.code)}
        onChange={(e) => setCode(e.target.value)}
        minRows={40}
        label={label}
        {...formProps}
        // value={code}
      />
      <FullScreenDropzone
        disabled={false}
        accept={['', 'text/x-python', 'text/x-c++src', 'text/rust']}
        onDrop={(files) => {
          onDrop(files);
        }}

        // onReject={(files) => console.log('rejected files', files[0])}
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
                Attach as many files as you like, each file should not
                exceed 5mb
              </Text>
            </div>
          </Group>
        )}
      </FullScreenDropzone>
    </div>
  );
};

export default memo(CodeArea);

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
