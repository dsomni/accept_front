import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import { useLocale } from '@hooks/useLocale';
import { Button, Group, Modal } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { useRouter } from 'next/router';
import { FC, memo, useCallback } from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { setter } from '@custom-types/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';

const DeleteModal: FC<{
  active: boolean;
  setActive: setter<boolean>;
  assignment: IAssignmentSchema;
}> = ({ active, setActive, assignment }) => {
  const { locale, lang } = useLocale();
  const router = useRouter();

  const handleDelete = useCallback(() => {
    const body = {
      spec: assignment.spec,
    };
    requestWithNotify(
      '/assignments/schema/delete',
      'POST',
      locale.notify.assignmentSchema.delete,
      lang,
      (_: any) => '',
      body,
      () => router.push('/edu/assignment/list')
    );
  }, [assignment, locale, router, lang]);

  return (
    <>
      <Modal
        opened={active}
        centered
        onClose={() => setActive(false)}
        size="lg"
        title={
          capitalize(locale.assignmentSchema.modals.delete) +
          ` '${assignment.title}'`
        }
        classNames={{
          title: deleteModalStyles.modalTitle,
        }}
      >
        <div className={deleteModalStyles.form}>
          <div className={deleteModalStyles.question}>
            {capitalize(locale.tasks.modals.deleteConfidence)}
          </div>
          <Group
            position="right"
            spacing="lg"
            className={deleteModalStyles.buttons}
          >
            <Button
              variant="outline"
              color="green"
              autoFocus
              onClick={() => setActive(false)}
            >
              {capitalize(locale.cancel)}
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => handleDelete()}
            >
              {capitalize(locale.delete)}
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default memo(DeleteModal);
