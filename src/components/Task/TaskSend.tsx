import { Select } from '@mantine/core';
import Editor from '@monaco-editor/react';
import { FC, memo, useState } from 'react';

const languages = [
  {
    value: 'cpp',
    label: 'C++',
  },
  {
    value: 'python',
    label: 'Python',
  },
  {
    value: 'pascal',
    label: 'Pascal',
  },
];

const TaskSend: FC = () => {
  const [lang, setLang] = useState('cpp');
  return (
    <div>
      <Select
        data={languages}
        value={lang}
        onChange={(value) => (value ? setLang(value) : null)}
      />
      <Editor key={lang} height={'70vh'} language={lang} />
    </div>
  );
};

export default memo(TaskSend);
