import { FC, memo, useState, useEffect } from 'react';
import CodeArea from '@ui/CodeArea/CodeArea';
import ListItem from '@ui/ListItem/ListItem';
import { useLocale } from '@hooks/useLocale';
import { Button, Textarea } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import styles from './checker.module.css';
import { ILanguage } from '@custom-types/data/atomic';
import { sendRequest } from '@requests/request';
import { Select } from '@mantine/core';

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
        label={capitalize(locale.language)}
        value={language}
        data={languages.map((lang) => ({
          label: capitalize(lang.name),
          value: lang.spec.toString(),
        }))}
        onBlur={() => form.validateField('checkerLang')}
        {...form.getInputProps('checkerLang')}
      />
      <CodeArea
        languages={languages}
        classNames={{
          label: styles.label,
        }}
        label={capitalize(locale.task.form.checker)}
        setLanguage={(value) =>
          form.setFieldValue('checkerLang', value)
        }
        setCode={(value) => form.setFieldValue('checkerCode', value)}
        formProps={{
          ...form.getInputProps('checkerCode'),
          onBlur: () => form.validateField('checkerCode'),
        }}
      />
      <div className={styles.listWrapper}>
        {form.values.tests &&
          form.values.tests.map(
            (value: [string, string], index: number) => (
              <div key={index}>
                <ListItem
                  label={
                    capitalize(locale.task.form.test) +
                    ' #' +
                    (index + 1)
                  }
                  classNames={{
                    label: styles.label,
                  }}
                  field="tests"
                  InLabel={capitalize(locale.task.form.inputTest)}
                  OutLabel={capitalize(locale.task.form.outputTest)}
                  form={form}
                  index={index}
                  onDelete={() => {}}
                  maxRows={7}
                  single
                />
              </div>
            )
          )}
        <Button
          size="lg"
          className={styles.addButton}
          color="var(--primary)"
          variant="light"
          onClick={() => {
            form.setFieldValue(
              'tests',
              (() => {
                form.values.tests.push(['', '']);
                return form.values.tests;
              })()
            );
            form.validateField('tests');
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default memo(Checker);
