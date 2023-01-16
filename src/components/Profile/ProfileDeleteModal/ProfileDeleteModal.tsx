import { FC, memo, useCallback, useState } from 'react';
import { IUser } from '@custom-types/data/IUser';
import { useLocale } from '@hooks/useLocale';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { requestWithNotify } from '@utils/requestWithNotify';
import styles from './profileDeleteModal.module.css';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { Button } from '@ui/basics';

const ProfileDeleteModal: FC<{
  user: IUser;
  opened: boolean;
  setOpened: (_: boolean) => void;
}> = ({ user, opened, setOpened }) => {
  const { locale, lang } = useLocale();
  const [toList, setToList] = useState(false);

  const close = useCallback(() => setOpened(false), [setOpened]);

  const handleSubmit = useCallback(() => {
    requestWithNotify(
      `profile/delete/${user.login}`,
      'DELETE',
      locale.notify.profile.main,
      lang,
      () => '',
      undefined,
      () => setToList(true)
    );
  }, [locale, lang, user.login]);

  return (
    <SimpleModal
      opened={opened}
      close={close}
      title={locale.profile.editModal}
    >
      <div className={styles.wrapper}>
        <div className={styles.text}>
          {'Удалить пользователя '} {user.login}
        </div>
        {!toList ? (
          <SimpleButtonGroup
            actionButton={{
              label: locale.edit,
              onClick: handleSubmit,
            }}
            cancelButton={{
              label: locale.cancel,
              onClick: close,
            }}
          />
        ) : (
          <Button
            variant="outline"
            href="/user/list"
            targetWrapperClassName={deleteModalStyles.toListButton}
          >
            {locale.toList}
          </Button>
        )}
      </div>
    </SimpleModal>
  );
};

export default memo(ProfileDeleteModal);
