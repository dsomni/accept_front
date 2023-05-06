import { FC, memo, useCallback, useState } from 'react';
import { IParticipant } from '@custom-types/data/IUser';
import { useLocale } from '@hooks/useLocale';
import { Button, TextInput } from '@ui/basics';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';
import { requestWithNotify } from '@utils/requestWithNotify';
import { useForm } from '@mantine/form';

const BanButton: FC<{
  user: IParticipant;
  spec: string;
  onSuccess: () => void;
}> = ({ user, spec, onSuccess }) => {
  const { locale, lang } = useLocale();
  const [modalOpened, setModalOpened] = useState(false);
  let ban = !!!user.banned;
  const form = useForm({
    initialValues: {
      banReason: '',
    },
    validate: {
      banReason: (value) =>
        value.length < 4
          ? locale.user.ban.form.validate.reason
          : null,
    },
    validateInputOnBlur: true,
  });

  const handleBan = useCallback(
    (banReason: string) => {
      if (ban && !form.isValid()) {
        return;
      }
      requestWithNotify(
        `tournament/participants/${ban ? 'ban' : 'unban'}/${spec}`,
        'POST',
        ban
          ? locale.notify.tournament.banUser
          : locale.notify.tournament.unbanUser,
        lang,
        () => '',
        {
          login: user.login,
          banReason,
        },
        onSuccess
      );
    },
    [form, ban, spec, locale, lang, user.login, onSuccess]
  );
  return (
    <>
      <SimpleModal
        opened={modalOpened}
        centered
        title={`${locale.user.modals.ban} '${user.login}'?`}
        close={() => setModalOpened(false)}
        size={'lg'}
      >
        <TextInput
          label={locale.attempt.banReason}
          style={{ marginBottom: 'var(--spacer-l)' }}
          {...form.getInputProps('banReason')}
        />
        <SimpleButtonGroup
          reversePositive
          actionButton={{
            label: locale.ban,
            onClick: () => handleBan(form.values.banReason),
            props: {
              disabled: !form.isValid(),
            },
          }}
          cancelButton={{
            label: locale.cancel,
            onClick: () => setModalOpened(false),
          }}
        />
      </SimpleModal>
      {!!!user.banned ? (
        <Button
          variant="outline"
          kind="negative"
          shrink
          onClick={() => setModalOpened(true)}
        >
          {locale.ban}
        </Button>
      ) : (
        <Button
          variant="outline"
          kind="positive"
          shrink
          onClick={() => handleBan('')}
        >
          {locale.unban}
        </Button>
      )}
    </>
  );
};

export default memo(BanButton);
