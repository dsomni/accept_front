import { Button } from '@mantine/core';
import { FC, memo, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import CodeArea from '@ui/CodeArea/CodeArea';
import { requestWithNotify } from '@utils/requestWithNotify';

const Send: FC<{ spec: string }> = ({ spec }) => {
  const { locale, lang } = useLocale();

  const [language, setLanguage] = useState<string>('');
  const [code, setCode] = useState('');

  const handleSubmit = useCallback(() => {
    const body = {
      task: spec,
      language: Number(language),
      programText: code,
      textAnswers: [],
    };
    requestWithNotify(
      'attempt/submit',
      'POST',
      locale.notify.attempt.send,
      lang,
      (_: {}) => '',
      body,
      () => {},
      { autoClose: 5000 }
    );
  }, [language, code, spec, locale, lang]);

  return (
    <div>
      <CodeArea
        label={''}
        setLanguage={setLanguage}
        setCode={setCode}
      />
      <Button onClick={handleSubmit}>{locale.tasks.submit}</Button>
    </div>
  );
};

export default memo(Send);
