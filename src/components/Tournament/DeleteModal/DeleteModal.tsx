import { ITournament } from '@custom-types/data/ITournament';
import { useLocale } from '@hooks/useLocale';
import { Group } from '@mantine/core';
import { FC, memo, useCallback, useState } from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { callback } from '@custom-types/ui/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { Button } from '@ui/basics';

const DeleteModal: FC<{
  active: boolean;
  setActive: callback<boolean, void>;
  tournament: ITournament;
}> = ({ active, setActive, tournament }) => {
  const { locale, lang } = useLocale();
  const [toList, setToList] = useState(false);

  const handleDelete = useCallback(() => {
    const body = {
      spec: tournament.spec,
    };
    requestWithNotify(
      'tournament/delete',
      'POST',
      locale.notify.tournament.delete,
      lang,
      (_: any) => '',
      body,
      () => setToList(true),
      { autoClose: 8000 }
    );
  }, [tournament.spec, locale, lang]);

  return (
    <>
      <SimpleModal
        opened={active}
        close={() => setActive(false)}
        hideCloseButton={true}
        title={`${locale.tournament.modals.delete} '${tournament.title}' ?`}
      >
        <div className={deleteModalStyles.form}>
          <Group
            position="right"
            spacing="lg"
            className={deleteModalStyles.buttons}
          >
            {!toList ? (
              <>
                <Button
                  variant="outline"
                  kind="positive"
                  autoFocus
                  onClick={() => setActive(false)}
                >
                  {locale.cancel}
                </Button>
                <Button
                  variant="outline"
                  kind="negative"
                  onClick={() => handleDelete()}
                >
                  {locale.delete}
                </Button>
              </>
            ) : (
              <Button variant="outline" href="/tournament/list">
                {locale.toList}
              </Button>
            )}
          </Group>
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(DeleteModal);
