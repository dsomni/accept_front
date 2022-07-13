import { Button, Select } from '@mantine/core';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import CodeArea from '@ui/CodeArea/CodeArea';
import { requestWithNotify } from '@utils/requestWithNotify';
import { capitalize } from '@utils/capitalize';
import ProgramLanguageSelector from '@components/ui/ProgramLanguageSelector/ProgramLanguageSelector';
import { setter } from '@custom-types/ui/atomic';
import { getCookie, setCookie } from '@utils/cookies';
import styles from './send.module.css';
import { Send as SendPlane } from 'tabler-icons-react';
import { ILanguage } from '@custom-types/data/atomic';
import { sendRequest } from '@requests/request';

const Send: FC<{ spec: string; setActiveTab: setter<number> }> = ({
  spec,
  setActiveTab,
}) => {
  const { locale, lang } = useLocale();

  const [defaultLangSpec, setDefaultLangSpec] = useState<string>('1');
  const [language, setLanguage] = useState<string>(defaultLangSpec);
  const [code, setCode] = useState('');
  const [langs, setLangs] = useState<ILanguage[]>([]);

  useEffect(() => {
    const prev_lang = getCookie('previous_program_lang');
    if (prev_lang) {
      setDefaultLangSpec(prev_lang);
      setLanguage(prev_lang);
    }
    sendRequest<{}, ILanguage[]>('language', 'GET').then((res) => {
      if (!res.error) {
        setLangs(res.response);
      }
    });
  }, []);

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
    setCookie('previous_program_lang', language);
    setActiveTab(2);
  }, [language, code, spec, locale, lang, setActiveTab]);

  const selector: any = useCallback(
    (props: any) => {
      return (
        <Select
          label={capitalize(locale.language)}
          onChange={setLanguage}
          value={language ? language : props.defaultValue.value}
          {...props}
        />
      );
    },
    [language, locale]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <ProgramLanguageSelector
          defaultLangSpec={defaultLangSpec}
          selector={selector}
          languages={langs}
        />

        <Button
          variant="outline"
          size="lg"
          onClick={handleSubmit}
          leftIcon={<SendPlane />}
        >
          {locale.tasks.submit}
        </Button>
      </div>
      <CodeArea
        label={''}
        languages={langs}
        setLanguage={setLanguage}
        setCode={setCode}
        formProps={{ value: code }}
        classNames={{
          root: styles.codeArea,
          wrapper: styles.codeArea,
          input: styles.codeArea,
        }}
      />
    </div>
  );
};

export default memo(Send);
