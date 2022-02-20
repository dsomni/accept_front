import { Button, Group, NativeSelect as Select, Text } from '@mantine/core';
import { ImageIcon, UploadIcon, CrossCircledIcon } from '@modulz/radix-icons';
import { FC, memo, useCallback, useState } from 'react';
import { Textarea } from '@mantine/core';
import { FullScreenDropzone } from '@mantine/dropzone';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import styles from './taskSend.module.css';
import Notify from '@components/Notify/Notify';

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

const TaskSend: FC<{ spec: string }> = ({ spec }) => {
  const [lang, setLang] = useState('cpp');
  const [code, setCode] = useState('');
  const { locale } = useLocale();
  const { user } = useUser();
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);

  const handleSubmit = useCallback(() => {
    fetch('/api/attempts/submit', {
      method: 'POST',
      body: JSON.stringify({
        author: user?.login,
        task: spec,
        language: lang,
        programText: code,
      }),
    })
      .then((res) => {
        setError(res.status !== 200);
        setAnswer(true);
      })
      .catch((e) => {
        setError(true);
        setAnswer(true);
      });
  }, [lang, code, user, spec]);

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) {
      const language = languages.find((item) => item.type === files[0].type);
      if (language) {
        setLang(language.value);
      }
      files[0].text().then((res) => setCode(res));
    }
  }, []);

  return (
    <div>
      <div className={styles.notification}>
        <Notify answer={answer} error={error} setAnswer={setAnswer} />
      </div>
      <Select data={languages} value={lang} onChange={(e) => setLang(e.target.value)} />
      <Textarea
        placeholder="your code here"
        onChange={(e) => setCode(e.target.value)}
        minRows={20}
        value={code}
      />
      <Button onClick={handleSubmit}>{locale.pages.tasks.submit}</Button>
      <FullScreenDropzone
        disabled={false}
        accept={['', 'text/x-python', 'text/x-c++src', 'text/rust']}
        onDrop={(files) => {
          onDrop(files);
        }}
        // onReject={(files) => console.log('rejected files', files[0])}
      >
        {(status) => (
          <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
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
                Attach as many files as you like, each file should not exceed 5mb
              </Text>
            </div>
          </Group>
        )}
      </FullScreenDropzone>
    </div>
  );
};

export default memo(TaskSend);

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
