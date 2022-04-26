import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import { ITask } from '@custom-types/ITask';
import { useLocale } from '@hooks/useLocale';
import { Button, Group, Modal } from '@mantine/core';
import { isSuccessful } from '@requests/request';
import { capitalize } from '@utils/capitalize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useState, useMemo } from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { setter } from '@custom-types/atomic';
import {
  newNotification,
  successNotification,
  errorNotification,
} from '@utils/notificationFunctions';

const DeleteModal: FC<{
  active: boolean;
  setActive: setter<boolean>;
  assignment: IAssignmentSchema;
}> = ({ active, setActive, assignment }) => {
  const [assignments, setAssignments] = useState<ITask[]>([]);
  const { locale, lang } = useLocale();
  const router = useRouter();

  const handleDelete = useCallback(() => {
    let cleanUp = false;

    const id = newNotification({
      title: capitalize(
        locale.notify.assignmentSchema.delete.loading
      ),
      message: capitalize(locale.loading) + '...',
    });
    isSuccessful<{}>('/assignments/schema/delete', 'POST', {
      spec: assignment.spec,
    }).then((res) => {
      if (!res.error && !cleanUp) {
        successNotification({
          id,
          title: capitalize(
            locale.notify.assignmentSchema.delete.success
          ),
        });
        router.push('/edu/assignment/list');
      } else {
        errorNotification({
          id,
          title: capitalize(
            locale.notify.assignmentSchema.delete.error
          ),
          message: capitalize(res.detail.description[lang]),
        });
      }
    });

    return () => {
      cleanUp = true;
    };
  }, [assignment, locale, router, lang]);

  return (
    <>
      <Modal
        opened={active}
        centered
        hideCloseButton
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
          {assignments.length > 0 && (
            <div>
              <div>
                {capitalize(locale.tasks.modals.usedInAssignments) +
                  ` (${assignments.length}):`}
              </div>
              <br />
              <div className={deleteModalStyles.assignmentList}>
                {assignments.map((assignment, index) => (
                  <div key={index}>
                    <Link href={`/edu/assignment/${assignment.spec}`}>
                      <a
                        className={deleteModalStyles.assignmentLink}
                        target="_blank"
                      >
                        {assignment.title}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
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
