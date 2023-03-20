import { pureCallback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { Helper } from '@ui/basics';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { requestWithNotify } from '@utils/requestWithNotify';
import { FC, memo, useCallback, useState } from 'react';
import { AlertCircle } from 'tabler-icons-react';
import modalStyles from '@styles/ui/modal.module.css';

import styles from './registrationButton.module.css';

const RegistrationButton: FC<{
  spec: string;
  status: number;
  allowRegistrationAfterStart: boolean;
  registered: boolean;
  onRegister: pureCallback;
  onRefusal: pureCallback;
}> = ({
  spec,
  status,
  allowRegistrationAfterStart,
  registered,
  onRegister,
  onRefusal,
}) => {
  const { locale, lang } = useLocale();
  const [openedConfirmModal, setOpenedConfirmModal] = useState(false);

  const handleRegistration = useCallback(() => {
    requestWithNotify<{}, boolean>(
      `tournament/register/${spec}`,
      'GET',
      locale.notify.tournament.registration,
      lang,
      () => '',
      undefined,
      () => {
        location.reload();
        onRegister();
      }
    );
  }, [spec, locale.notify.tournament.registration, lang, onRegister]);

  const handleRefusal = useCallback(() => {
    requestWithNotify<{}, boolean>(
      `tournament/refusal/${spec}`,
      'GET',
      locale.notify.tournament.refusal,
      lang,
      () => '',
      undefined,
      () => {
        location.reload();
        onRefusal();
      }
    );
  }, [spec, locale.notify.tournament.refusal, lang, onRefusal]);

  return (
    <>
      <SimpleModal
        opened={openedConfirmModal}
        close={() => setOpenedConfirmModal(false)}
        title={locale.tournament.modals.refusal.title}
      >
        <div className={modalStyles.verticalContent}>
          <div>{locale.tournament.modals.refusal.message}</div>
          {status == 1 && !allowRegistrationAfterStart && (
            <div className={styles.undoWarning}>
              {locale.tournament.modals.refusal.undoWarning}
            </div>
          )}

          <SimpleButtonGroup
            reversePositive
            actionButton={{
              label: locale.yes,
              onClick: handleRefusal,
            }}
            cancelButton={{
              label: locale.cancel,
              onClick: () => setOpenedConfirmModal(false),
            }}
          />
        </div>
      </SimpleModal>
      <div>
        {registered ? (
          <div className={styles.registrationWrapper}>
            <div
              onClick={() => setOpenedConfirmModal(true)}
              className={styles.register}
            >
              {locale.tournament.refuse}
            </div>
            <Helper
              dropdownContent={locale.helpers.tournament.refusal}
            />
            {status == 1 && !allowRegistrationAfterStart && (
              <Helper
                dropdownContent={
                  locale.helpers.tournament.refusalWarning
                }
                customIcon={<AlertCircle color={'var(--negative)'} />}
              />
            )}
          </div>
        ) : (
          (status === 0 || allowRegistrationAfterStart) && (
            <div className={styles.registrationWrapper}>
              <div
                onClick={handleRegistration}
                className={styles.register}
              >
                {locale.tournament.register}
              </div>
              <Helper
                dropdownContent={
                  locale.helpers.tournament.registration
                }
              />
              {!allowRegistrationAfterStart && (
                <Helper
                  dropdownContent={
                    locale.helpers.tournament.registrationWarning
                  }
                  customIcon={
                    <AlertCircle color={'var(--negative)'} />
                  }
                />
              )}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default memo(RegistrationButton);
