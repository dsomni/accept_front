import { FC, memo, useState, useEffect } from 'react';
import CodeArea from '@ui/CodeArea/CodeArea';
import ListItem from '@ui/ListItem/ListItem';
import { useLocale } from '@hooks/useLocale';
import { Button, Textarea } from '@mantine/core';

import styles from './checker.module.css';
import { ILanguage } from '@custom-types/data/atomic';
import { sendRequest } from '@requests/request';
import { Select } from '@mantine/core';
import Tests from '../Tests/Tests';

const defaultLangSpec = '0';

const Checker: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [language, setLanguage] = useState(defaultLangSpec);

  useEffect(() => {
    sendRequest<{}, ILanguage[]>(
      'language',
      'GET',
      undefined,
      60000
    ).then((res) => {
      if (!res.error) {
        setLanguages(res.response);
      }
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Select
        label={locale.language}
        value={language}
        data={languages.map((lang) => ({
          label: lang.name,
          value: lang.spec.toString(),
        }))}
        styles={{ label: { fontSize: 'var(--font-size-xl)' } }}
        onBlur={() => form.validateField('checkerLang')}
        {...form.getInputProps('checkerLang')}
      />
      <CodeArea
        languages={languages}
        classNames={{
          label: styles.label,
        }}
        label={locale.task.form.checker}
        setLanguage={(value) =>
          form.setFieldValue('checkerLang', value)
        }
        setCode={(value) => form.setFieldValue('checkerCode', value)}
        formProps={{
          ...form.getInputProps('checkerCode'),
          onBlur: () => form.validateField('checkerCode'),
        }}
      />
      <div className={styles.tests}>
        {' '}
        <Tests form={form} hideOutput />
      </div>
    </div>
  );
};

export default memo(Checker);
