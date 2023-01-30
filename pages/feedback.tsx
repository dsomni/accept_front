import { DefaultLayout } from '@layouts/DefaultLayout';
import Title from '@ui/Title/Title';
import { ReactElement, useCallback } from 'react';
import styles from '@styles/feedback.module.css';
import { useForm } from '@mantine/form';
import {
  IFeedbackMessage,
  feedbackSubjects,
} from '@custom-types/data/IFeedbackMessage';
import { useLocale } from '@hooks/useLocale';
import { Button, CustomEditor, Select } from '@ui/basics';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import { useUser } from '@hooks/useUser';
import { UTCDate } from '@utils/datetime';
import { requestWithNotify } from '@utils/requestWithNotify';

export function Feedback() {
  const { locale, lang } = useLocale();

  const { user } = useUser();

  const form = useForm({
    initialValues: {
      spec: '',
      author: '',
      message: '',
      subject: 'bug',
      date: new Date(),
      reviewed: false,
    } as IFeedbackMessage,
    validate: {
      subject: (value) =>
        value.length == 0
          ? locale.feedback.form.validation.subject
          : null,
      message: (value) =>
        value.length < 5
          ? locale.feedback.form.validation.message
          : null,
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = useCallback(() => {
    if (form.validate().hasErrors) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.notify.feedback.validation.error,
        autoClose: 5000,
      });
      return;
    }

    const message: IFeedbackMessage = {
      ...form.values,
      spec: '',
      author: user?.login || 'Anonymous',
      date: UTCDate(new Date()),
    };
    console.log(message);
    requestWithNotify<IFeedbackMessage, boolean>(
      'feedback/add',
      'POST',
      locale.notify.feedback.send,
      lang,
      () => '',
      message
    );
  }, [form, lang, locale, user?.login]);

  return (
    <>
      <Title title={locale.titles.about} />
      <div className={styles.wrapper}>
        <div className={styles.title}>Обратная связь</div>
        <div className={styles.text}>
          Мы благодарны за каждый отзыв, сообщение о баге и тп
        </div>
        <div className={styles.form}>
          <Select
            label={locale.feedback.form.subject}
            data={feedbackSubjects.map((item) => ({
              label: locale.feedback.subjects[item],
              value: item,
            }))}
            {...form.getInputProps('subject')}
          />
          <CustomEditor
            label={locale.feedback.form.message}
            form={form}
            name={'message'}
          />
          <div className={styles.buttonWrapper}>
            <Button disabled={!form.isValid()} onClick={handleSubmit}>
              {locale.send}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

Feedback.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default Feedback;
