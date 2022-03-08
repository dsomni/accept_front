import { Button } from '@mantine/core';
import { FC, memo, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import styles from './send.module.css';
import Notify from '@components/Notify/Notify';
import { isSuccessful } from '@requests/request';
import CodeArea from '@components/CodeArea/CodeArea';

const Send: FC<{ spec: string }> = ({ spec }) => {
  const { locale } = useLocale();
  const { user } = useUser();

  const [lang, setLang] = useState('cpp');
  const [code, setCode] = useState('');

  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);

  const handleSubmit = useCallback(() => {
    isSuccessful('attempts/submit', 'POST', {
      author: user?.login,
      task: spec,
      language: lang,
      programText: code,
    }).then((success) => {
      setError(!success);
      setAnswer(true);
    });
  }, [lang, code, user, spec]);

  return (
    <div>
      <div className={styles.notification}>
        <Notify answer={answer} error={error} setAnswer={setAnswer} />
      </div>
      <CodeArea label={''} setLanguage={setLang} setCode={setCode} />
      <Button onClick={handleSubmit}>{locale.tasks.submit}</Button>
    </div>
  );
};

export default memo(Send);
