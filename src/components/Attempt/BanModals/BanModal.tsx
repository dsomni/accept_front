import { FC, memo, useCallback, useState } from 'react';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { BarrierBlock } from 'tabler-icons-react';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { IAttempt } from '@custom-types/data/IAttempt';
import { useLocale } from '@hooks/useLocale';
import { Button, Helper, TextInput } from '@ui/basics';
import { Group } from '@mantine/core';
import { requestWithNotify } from '@utils/requestWithNotify';
import styles from './banModal.module.css';

const BanModal: FC<{ attempt: IAttempt }> = ({ attempt }) => {
  const [opened, setOpened] = useState(false);
  const [reason, setReason] = useState('');
  const { locale, lang } = useLocale();

  const handleBan = useCallback(() => {
    requestWithNotify(
      'attempt/ban',
      'POST',
      locale.attempt.ban.request,
      lang,
      () => '',
      { spec: attempt.spec, author: attempt.author }
    );
  }, [locale, lang, attempt]);

  return (
    <>
      <SingularSticky
        icon={<BarrierBlock width={32} height={32} />}
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
              value={reason}
              onChange={(e) => setReason(e.target.value)}
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
