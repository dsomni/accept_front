import { FC, memo, useCallback, useState } from 'react';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { BarrierBlockOff } from 'tabler-icons-react';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { IAttempt } from '@custom-types/data/IAttempt';
import { useLocale } from '@hooks/useLocale';
import { Button } from '@ui/basics';
import { Group } from '@mantine/core';
import { requestWithNotify } from '@utils/requestWithNotify';
import styles from './banModal.module.css';

const UnbanModal: FC<{ attempt: IAttempt }> = ({ attempt }) => {
  const [opened, setOpened] = useState(false);
  const { locale, lang } = useLocale();

  const handleUnban = useCallback(() => {
    requestWithNotify(
      'attempt/unban',
      'POST',
      locale.attempt.unban.request,
      lang,
      () => '',
      { spec: attempt.spec, author: attempt.author }
    );
  }, [locale, lang, attempt]);

  return (
    <>
      <SingularSticky
        icon={<BarrierBlockOff width={32} height={32} />}
        color="green"
        onClick={() => setOpened(false)}
      />
      <SimpleModal
        title={locale.attempt.unban.title}
        opened={opened}
        close={() => setOpened(false)}
      >
        <div className={styles.wrapper}>
          {attempt.banInfo && <div>{attempt.banInfo.reason}</div>}
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
