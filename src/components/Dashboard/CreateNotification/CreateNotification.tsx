import { useLocale } from '@hooks/useLocale';
import { useForm } from '@mantine/form';
import { Button, CustomEditor, Helper, TextInput } from '@ui/basics';
import { FC, memo, useCallback } from 'react';
import styles from './createNotification.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { INewNotification } from '@custom-types/data/notification';

import { useUser } from '@hooks/useUser';
import { Group } from '@mantine/core';
import { useBackNotifications } from '@hooks/useBackNotifications';
import { requestWithNotify } from '@utils/requestWithNotify';

const CreateNotification: FC<{ groups: string[] }> = ({ groups }) => {
  const { locale, lang } = useLocale();
  const { user } = useUser();
  const { notifyAboutCreation } = useBackNotifications();

  const form = useForm({
    initialValues: {
      notificationTitle: '',
      notificationShortDescription: '',
      notificationDescription: '',
    },
    validate: {
      notificationTitle: (value) =>
        value.length == 0
          ? locale.notification.form.validate.title
          : null,

      notificationShortDescription: () => null,
      notificationDescription: () => null,
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = useCallback(() => {
    const notification: INewNotification = {
      spec: '',
      title: form.values.notificationTitle,
      shortDescription: form.values.notificationShortDescription,
      description: form.values.notificationDescription,
      logins: [],
      groups: groups,
      roles: [],
      author: user?.login || '',
      broadcast: false,
    };

    requestWithNotify<INewNotification, string>(
      'notification/add',
      'POST',
      locale.notify.notification.create,
      lang,
      (_: string) => '',
      notification,
      notifyAboutCreation
    );
  }, [
    form.values,
    groups,
    user?.login,
    locale,
    lang,
    notifyAboutCreation,
  ]);

  return (
    <>
      <div className={styles.notificationWrapper}>
        <div className={styles.notificationLabel}>
          <div>{locale.notification.notification}</div>
          <Helper
            dropdownContent={
              <div>
                {locale.helpers.notification.assignmentCreation.map(
                  (p, idx) => (
                    <p key={idx}>{p}</p>
                  )
                )}
              </div>
            }
          />
        </div>
        <TextInput
          label={locale.notification.form.title}
          required
          {...form.getInputProps('notificationTitle')}
        />
        <TextInput
          label={locale.notification.form.shortDescription}
          helperContent={
            <div>
              {locale.helpers.notification.shortDescription.map(
                (p, idx) => (
                  <p key={idx}>{p}</p>
                )
              )}
            </div>
          }
          {...form.getInputProps('notificationShortDescription')}
        />
        <CustomEditor
          classNames={{
            label: stepperStyles.label,
          }}
          helperContent={
            <div>
              {locale.helpers.notification.description.map(
                (p, idx) => (
                  <p key={idx}>{p}</p>
                )
              )}
            </div>
          }
          label={locale.notification.form.description}
          form={form}
          name={'notificationDescription'}
        />
      </div>
      <Group position="center">
        <Button
          disabled={Object.keys(form.errors).length > 0}
          onClick={handleSubmit}
        >
          {locale.create}
        </Button>
      </Group>
    </>
  );
};

export default memo(CreateNotification);
