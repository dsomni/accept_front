import { Button } from '@mantine/core';
import { FC, memo, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import CodeArea from '@ui/CodeArea/CodeArea';
import { requestWithNotify } from '@utils/requestWithNotify';

const Send: FC<{ spec: string }> = ({ spec }) => {
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');

  const handleSubmit = useCallback(() => {
    const body = {
      author: user?.login,
      task: spec,
      language: language,
      programText: code,
    };
    requestWithNotify(
      'attempts/submit',
      'POST',
      locale.notify.assignmentSchema.create,
      lang,
      (_: {}) => '',
      body
    );
  }, [language, code, user, spec, locale, lang]);

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
