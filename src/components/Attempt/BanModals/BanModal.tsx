import { FC, memo, useCallback, useState } from 'react';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { HeartBroken } from 'tabler-icons-react';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { IAttempt } from '@custom-types/data/IAttempt';
import { useLocale } from '@hooks/useLocale';
import { TextInput } from '@ui/basics';
import { requestWithNotify } from '@utils/requestWithNotify';
import { useForm } from '@mantine/form';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';
import modalStyles from '@styles/ui/modal.module.css';

const BanModal: FC<{ attempt: IAttempt }> = ({ attempt }) => {
  const [opened, setOpened] = useState(false);
  const { locale, lang } = useLocale();

  const form = useForm({
    initialValues: {
      reason: '',
    },
    validate: {
      reason: (value) =>
        value.length < 5
          ? locale.attempt.ban.validation.reason.tooShort
          : null,
    },
    validateInputOnChange: true,
  });

  const handleBan = useCallback(() => {
    requestWithNotify(
      `attempt/ban/${attempt.spec}`,
      'POST',
      locale.attempt.ban.request,
      lang,
      () => '',
      { reason: form.values.reason },
      () => window.location.reload()
    );
  }, [locale, lang, attempt, form.values.reason]);

  return (
    <>
      <SingularSticky
        icon={<HeartBroken width={32} height={32} />}
        color="red"
        onClick={() => setOpened(true)}
        description={locale.tip.sticky.attempt.ban}
      />
      <SimpleModal
        title={locale.attempt.ban.title}
        helperContent={
          <div>
            {locale.helpers.attempt.ban.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        }
        opened={opened}
        close={() => setOpened(false)}
      >
        <div className={modalStyles.verticalContent}>
          <TextInput
            label={locale.attempt.ban.reason}
            shrink
            required
            {...form.getInputProps('reason')}
          />

          <SimpleButtonGroup
            actionButton={{
              label: locale.attempt.ban.action,
              onClick: handleBan,
              props: {
                disabled: !form.isValid(),
              },
            }}
            cancelButton={{
              label: locale.cancel,
              onClick: () => setOpened(false),
            }}
          />
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(BanModal);
