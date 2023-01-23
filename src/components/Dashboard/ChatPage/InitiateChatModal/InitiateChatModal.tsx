import { useLocale } from '@hooks/useLocale';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { FC, memo, useCallback, useState } from 'react';
import MemberSelector from './MemberSelector/MemberSelector';
import { IUserDisplay } from '@custom-types/data/IUser';
import styles from './initiateChatModal.module.css';
import { Button, TextArea } from '@ui/basics';
import { useForm } from '@mantine/form';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';

const InitiateChatModal: FC<{
  exclude: string[];
  entity: string;
  type: 'tournament' | 'assignment';
}> = ({ exclude, entity, type }) => {
  const { locale } = useLocale();
  const [startChatModal, setStartChatModal] = useState(true);
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

  return (
    <>
      <Button
        className={styles.addHostButton}
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
            select={(user: IUserDisplay) => {
              form.setFieldValue('user', user.login.trim());
            }}
            onChange={() => form.validateField('user')}
          />
          <TextArea
            label={locale.dashboard.chat.userModal.message.label}
            placeholder={
              locale.dashboard.chat.userModal.message.placeholder
            }
            {...form.getInputProps('text')}
          />
          <SimpleButtonGroup
            actionButton={{
              label: locale.attempt.ban.action,
              onClick: () => console.log(form.values),
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
