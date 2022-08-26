import { FC, memo, useEffect, useState } from 'react';
import CodeArea from '@ui/CodeArea/CodeArea';
import { Select } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';
import styles from './checker.module.css';
import { ILanguage } from '@custom-types/data/atomic';
import { sendRequest } from '@requests/request';
import Tests from '@components/Task/Form/Tests/Tests';
import stepperStyles from '@styles/ui/stepper.module.css';

const defaultLangSpec = '0';

const Checker: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();
  const [languages, setLanguages] = useState<ILanguage[]>([]);

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
    <>
      <Select
        label={locale.language}
        value={defaultLangSpec}
        data={languages.map((lang) => ({
          label: lang.name,
          value: lang.spec.toString(),
        }))}
        classNames={{
          label: stepperStyles.label,
        }}
        onBlur={() => form.validateField('checkerLang')}
        {...form.getInputProps('checkerLang')}
      />
      <CodeArea
        languages={languages}
        helperContent={
          <div>
            {locale.helpers.task.checker.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        }
        classNames={{
          label: stepperStyles.label,
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
        buttonProps={{
          style: {
            marginBottom: 'var(--spacer-xs)',
            marginTop: 'var(--spacer-s)',
          },
        }}
      />
      <div className={styles.tests}>
        <Tests form={form} hideOutput />
      </div>
    </>
  );
};

export default memo(Checker);
