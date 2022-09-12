import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import { useLocale } from '@hooks/useLocale';
import { Group, Modal } from '@mantine/core';
import { FC, memo, useCallback, useState } from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { setter } from '@custom-types/ui/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';
import { Button } from '@ui/basics';

const DeleteModal: FC<{
  active: boolean;
  setActive: setter<boolean>;
  assignment: IAssignmentSchema;
}> = ({ active, setActive, assignment }) => {
  const { locale, lang } = useLocale();

  const [toList, setToList] = useState(false);

  const handleDelete = useCallback(() => {
    const body = {
      spec: assignment.spec,
    };
    requestWithNotify(
      '/assignment_schema/delete',
      'POST',
      locale.notify.assignmentSchema.delete,
      lang,
      (_: any) => '',
      body,
      () => setToList(true)
    );
  }, [assignment, locale, lang]);

  return (
    <>
      <Modal
        opened={active}
        centered
        onClose={() => setActive(false)}
        size="lg"
        title={
          locale.assignmentSchema.modals.delete +
          ` '${assignment.title}'`
        }
        classNames={{
          title: deleteModalStyles.modalTitle,
        }}
      >
        <div className={deleteModalStyles.form}>
          <div className={deleteModalStyles.question}>
            {locale.task.modals.deleteConfidence}
          </div>
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
              <Button
                variant="outline"
                href="/edu/assignment_schema/list"
              >
                {locale.toList}
              </Button>
            )}
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default memo(DeleteModal);
