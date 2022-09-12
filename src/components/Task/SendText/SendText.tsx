import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { Button, TextArea } from '@ui/basics';
import { requestWithNotify } from '@utils/requestWithNotify';
import { FC, memo, useCallback, useState } from 'react';
import { Send as SendPlane } from 'tabler-icons-react';
import styles from './sendText.module.css';

const SendText: FC<{
  spec: string;
  testsNumber: number;
  setActiveTab: setter<string | undefined>;
}> = ({ spec, testsNumber, setActiveTab }) => {
  const { locale, lang } = useLocale();
  const [fields, setFields] = useState<string[]>(
    Array(testsNumber).fill('')
  );

  const handleField = useCallback((index: number) => {
    return (e: any) => {
      setFields((fields: string[]) => {
        fields[index] = e.target.value;
        return fields;
      });
    };
  }, []);

  const handleSubmit = useCallback(() => {
    const body = {
      task: spec,
      language: 1,
      programText: '',
      textAnswers: fields,
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
    setActiveTab('results');
  }, [spec, fields, locale.notify.attempt.send, lang, setActiveTab]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonWrapper}>
        <Button
          variant="outline"
          size="lg"
          onClick={handleSubmit}
          leftIcon={<SendPlane color={'var(--primary)'} />}
        >
          {locale.task.submit}
        </Button>
      </div>
      <div className={styles.itemsWrapper}>
        {fields.map((_, index) => (
          <div className={styles.itemWrapper} key={index}>
            <div className={styles.itemTitle}>
              {' '}
              {`${locale.task.answer} #${index + 1}`}
            </div>
            <TextArea
              onChange={handleField(index)}
              autosize
              maxRows={10}
              minRows={3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SendText);
