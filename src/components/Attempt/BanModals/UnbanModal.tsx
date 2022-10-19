import { FC, memo, useCallback, useState } from 'react';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { HeartPlus } from 'tabler-icons-react';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { IAttempt } from '@custom-types/data/IAttempt';
import { useLocale } from '@hooks/useLocale';
import { Button, Helper } from '@ui/basics';
import { Group } from '@mantine/core';
import { requestWithNotify } from '@utils/requestWithNotify';
import { getLocalDate } from '@utils/datetime';
import styles from './banModal.module.css';

const UnbanModal: FC<{ attempt: IAttempt }> = ({ attempt }) => {
  const [opened, setOpened] = useState(false);
  const { locale, lang } = useLocale();

  const handleUnban = useCallback(() => {
    requestWithNotify(
      `attempt/unban/${attempt.spec}`,
      'GET',
      locale.attempt.unban.request,
      lang,
      () => '',
      undefined,
      () => window.location.reload()
    );
  }, [locale, lang, attempt]);

  return (
    <>
      <SingularSticky
        icon={<HeartPlus width={32} height={32} />}
        color="green"
        onClick={() => setOpened(true)}
      />
      <SimpleModal
        title={locale.attempt.unban.title}
        titleHelper={
          <Helper
            dropdownContent={
              <div>
                {locale.helpers.attempt.unban.map((p, idx) => (
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
          <div className={styles.rowsWrapper}>
            <div>
              {locale.attempt.unban.previousBanDate}{' '}
              {`${getLocalDate(attempt.banInfo?.date || new Date())}`}
            </div>
            <div>
              {locale.attempt.unban.previousBanRequester}{' '}
              {attempt.banInfo?.requester || ''}
            </div>
            <div>
              {locale.attempt.unban.previousBanReason}{' '}
              {attempt.banInfo?.reason || ''}
            </div>
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
              onClick={handleUnban}
            >
              {locale.attempt.unban.action}
            </Button>
          </Group>
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(UnbanModal);
