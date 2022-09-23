import { IAssignmentDisplay } from '@custom-types/data/IAssignment';
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
  assignment: IAssignmentDisplay;
}> = ({ active, setActive, assignment }) => {
  const { locale, lang } = useLocale();
  const [toList, setToList] = useState(false);

  const handleDelete = useCallback(() => {
    const body = {
      spec: assignment.spec,
    };
    requestWithNotify(
      'assignment/delete',
      'POST',
      locale.notify.assignment.delete,
      lang,
      (_: any) => '',
      body,
      () => setToList(true),
      { autoClose: 8000 }
    );
  }, [assignment.spec, locale, lang]);

  return (
    <>
      <SimpleModal
        opened={active}
        close={() => setActive(false)}
        hideCloseButton={true}
        title={
          locale.assignment.modals.delete + ` '${assignment.title}' ?`
        }
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
              <Button variant="outline" href="/assignment/list">
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
