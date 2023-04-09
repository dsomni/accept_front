import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { useForm } from '@mantine/form';
import { Button, TextArea } from '@ui/basics';
import { requestWithNotify } from '@utils/requestWithNotify';
import { FC, memo, useCallback, useEffect } from 'react';
import { Send as SendPlane } from 'tabler-icons-react';
import styles from './sendText.module.css';

const SendText: FC<{
  spec: string;
  testsNumber: number;
  setActiveTab: setter<string | undefined>;
}> = ({ spec, testsNumber, setActiveTab }) => {
  const { locale, lang } = useLocale();

  const form = useForm({
    initialValues: {
      answers: Array(testsNumber).fill(''),
    },
    validate: {
      answers: (value) =>
        !value.find((item) => item.trim().length > 0),
    },
  });

  const resetAnswers = useCallback(() => {
    form.setFieldValue('answers', Array(testsNumber).fill(''));
  }, [form, testsNumber]);

  const handleSubmit = useCallback(() => {
    if (!form.isValid()) {
      return;
    }
    const body = {
      task: spec,
      language: 1,
      programText: '',
      textAnswers: form.values.answers,
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
    resetAnswers();
    setActiveTab('results');
  }, [
    form,
    spec,
    locale.notify.attempt.send,
    lang,
    resetAnswers,
    setActiveTab,
  ]);

  useEffect(() => {
    console.log(form.values.answers);
  }, [form.values.answers]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonWrapper}>
        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={!form.isValid()}
          dropdownContent={
            !form.isValid() ? (
              <div>
                {locale.helpers.task.emptyTextAnswer.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            ) : (
              <></>
            )
          }
          leftIcon={
            <SendPlane
              color={!form.isValid() ? 'black' : 'var(--primary)'}
            />
          }
        >
          {locale.task.submit}
        </Button>
      </div>
      <div className={styles.itemsWrapper}>
        {Array(testsNumber)
          .fill('')
          .map((_, index) => (
            <div className={styles.itemWrapper} key={index}>
              <div className={styles.itemTitle}>
                {' '}
                {`${locale.task.answer} #${index + 1}`}
              </div>
              <TextArea
                autosize
                maxRows={10}
                minRows={3}
                {...form.getInputProps(`answers.${index}`)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(SendText);
