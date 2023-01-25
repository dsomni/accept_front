import { useLocale } from '@hooks/useLocale';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { FC, memo, useCallback, useState } from 'react';
import MemberSelector from './MemberSelector/MemberSelector';
import styles from './initiateChatModal.module.css';
import { Button, TextArea } from '@ui/basics';
import { useForm } from '@mantine/form';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

const InitiateChatModal: FC<{
  exclude: string[];
  entity: string;
  type: 'tournament' | 'assignment';
  small?: boolean;
}> = ({ exclude, entity, type, small }) => {
  const { locale, lang } = useLocale();
  const [startChatModal, setStartChatModal] = useState(false);
  const close = useCallback(() => setStartChatModal(false), []);

  const form = useForm({
    initialValues: {
      user: '',
      message: '',
    },
    validate: {
      user: (value) =>
        value
          ? null
          : locale.dashboard.chat.userModal.validation.user,
      message: (value) =>
        value.trim().length > 0
          ? null
          : locale.dashboard.chat.userModal.validation.message,
    },
    validateInputOnChange: true,
  });

  const handleSubmit = useCallback(() => {
    console.log(form.values);
    if (form.validate().hasErrors) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.notify.group.validation.error,
        autoClose: 5000,
      });
      return;
    }
  }, [form, locale.notify.group.validation.error]);

  return (
    <>
      <Button
        className={
          small ? styles.addHostButtonSmall : styles.addHostButton
        }
        variant="light"
        onClick={() => setStartChatModal(true)}
      >
        +
      </Button>
      <SimpleModal
        title={locale.dashboard.chat.userModal.title}
        opened={startChatModal}
        close={close}
      >
        <div className={styles.wrapper}>
          <MemberSelector
            entity={entity}
            type={type}
            opened={startChatModal}
            exclude={exclude}
            form={form}
            field={'user'}
          />
          <TextArea
            label={locale.dashboard.chat.userModal.message.label}
            placeholder={
              locale.dashboard.chat.userModal.message.placeholder
            }
            {...form.getInputProps('message')}
          />
          <SimpleButtonGroup
            actionButton={{
              label: locale.attempt.ban.action,
              onClick: handleSubmit,
              props: {
                disabled: !form.isValid(),
              },
            }}
            cancelButton={{
              label: locale.cancel,
              onClick: close,
            }}
          />
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(InitiateChatModal);
