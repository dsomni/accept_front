import { FC, memo, useCallback, useState } from 'react';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { HeartBroken } from 'tabler-icons-react';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { IAttempt } from '@custom-types/data/IAttempt';
import { useLocale } from '@hooks/useLocale';
import { Button, Helper, TextInput } from '@ui/basics';
import { Group } from '@mantine/core';
import { requestWithNotify } from '@utils/requestWithNotify';
import styles from './banModal.module.css';
import { useForm } from '@mantine/form';

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
      />
      <SimpleModal
        title={locale.attempt.ban.title}
        titleHelper={
          <Helper
            dropdownContent={
              <div>
                {locale.helpers.attempt.ban.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            }
          />
        }
        opened={opened}
        close={() => setOpened(false)}
      >
        <div className={styles.wrapper}>
          <div>
            <TextInput
              label={locale.attempt.ban.reason}
              {...form.getInputProps('reason')}
            />
          </div>
          <Group
            position="right"
            spacing="lg"
            className={styles.buttons}
          >
            <Button
              variant="outline"
              kind="negative"
              onClick={() => setOpened(false)}
            >
              {locale.cancel}
            </Button>
            <Button
              variant="outline"
              kind="positive"
              disabled={!form.isValid()}
              onClick={handleBan}
            >
              {locale.attempt.ban.action}
            </Button>
          </Group>
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(BanModal);
