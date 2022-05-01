import { ITask, ITaskDisplay } from '@custom-types/ITask';
import { useLocale } from '@hooks/useLocale';
import { Button, Group, Modal } from '@mantine/core';
import { sendRequest } from '@requests/request';
import { capitalize } from '@utils/capitalize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { callback } from '@custom-types/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';

const DeleteModal: FC<{
  active: boolean;
  setActive: callback<boolean, void>;
  task: ITaskDisplay;
}> = ({ active, setActive, task }) => {
  const [assignments, setAssignments] = useState<ITask[]>([]);
  const { locale, lang } = useLocale();
  const router = useRouter();

  useEffect(() => {
    let cleanUp = false;

    sendRequest<{}, ITask[]>(
      `/tasks/connected_assignments/${task.spec}`,
      'POST'
    ).then((res) => {
      if (!res.error && !cleanUp) {
        setAssignments(res.response);
      }
    });

    return () => {
      cleanUp = true;
    };
  }, [task]);

  const handleDelete = useCallback(() => {
    const body = {
      spec: task.spec,
    };
    requestWithNotify(
      'tasks/delete',
      'POST',
      locale.notify.task.delete,
      lang,
      (_: any) => '',
      body,
      () => router.push('/task/list')
    );
  }, [task.spec, locale, router, lang]);

  return (
    <>
      <Modal
        opened={active}
        centered
        onClose={() => setActive(false)}
        size="lg"
        title={
          capitalize(locale.tasks.modals.delete) +
          ` '${task.title}' ?`
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
