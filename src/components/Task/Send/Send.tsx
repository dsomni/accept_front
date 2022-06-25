import { Button, Select } from '@mantine/core';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import CodeArea from '@ui/CodeArea/CodeArea';
import { requestWithNotify } from '@utils/requestWithNotify';
import { capitalize } from '@utils/capitalize';
import ProgramLanguageSelector from '@components/ui/ProgramLanguageSelector/ProgramLanguageSelector';
import { setter } from '@custom-types/ui/atomic';
import { getCookie, setCookie } from '@utils/cookies';

const Send: FC<{ spec: string; setActiveTab: setter<number> }> = ({
  spec,
  setActiveTab,
}) => {
  const { locale, lang } = useLocale();

  const [defaultLangSpec, setDefaultLangSpec] = useState<string>('1');
  const [language, setLanguage] = useState<string>(defaultLangSpec);
  const [code, setCode] = useState('');

  useEffect(() => {
    const prev_lang = getCookie('previous_program_lang');
    if (prev_lang) {
      setDefaultLangSpec(prev_lang);
      setLanguage(prev_lang);
    }
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
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <ProgramLanguageSelector
          defaultLangSpec={defaultLangSpec}
          selector={selector}
        />

        <Button onClick={handleSubmit}>{locale.tasks.submit}</Button>
      </div>
      <CodeArea
        label={''}
        setLanguage={setLanguage}
        setCode={setCode}
      />
    </div>
  );
};

export default memo(Send);
