import { ITask, ITaskDisplay } from '@custom-types/data/ITask';
import { IAssignmentSchemaDisplay } from '@custom-types/data/IAssignmentSchema';
import { useLocale } from '@hooks/useLocale';
import { Button, Group } from '@mantine/core';
import { sendRequest } from '@requests/request';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { callback } from '@custom-types/ui/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';
import SimpleModal from '@ui/SimpleModal/SimpleModal';

const DeleteModal: FC<{
  active: boolean;
  setActive: callback<boolean, void>;
  task: ITaskDisplay;
}> = ({ active, setActive, task }) => {
  const [assignments, setAssignments] = useState<
    IAssignmentSchemaDisplay[]
  >([]);
  const { locale, lang } = useLocale();
  const router = useRouter();

  useEffect(() => {
    let cleanUp = false;

    sendRequest<{}, IAssignmentSchemaDisplay[]>(
      `/task/connected_assignments/${task.spec}`,
      'POST',
      undefined,
      60000
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
      'task/delete',
      'POST',
      locale.notify.task.delete,
      lang,
      (_: any) => '',
      body,
      () => router.push('/task/list'),
      { autoClose: 8000 }
    );
  }, [task.spec, locale, router, lang]);

  return (
    <>
      <SimpleModal
        opened={active}
        close={() => setActive(false)}
        hideCloseButton={true}
        title={locale.task.modals.delete + ` '${task.title}' ?`}
      >
        <div className={deleteModalStyles.form}>
          <div className={deleteModalStyles.question}>
            {locale.task.modals.deleteConfidence}
          </div>
          {assignments.length > 0 && (
            <div>
              <div>
                {locale.task.modals.usedInAssignments +
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
              styles={{
                label: {
                  fontWeight: 'normal',
                  fontSize: 'var(--font-size-s)',
                },
              }}
              onClick={() => setActive(false)}
            >
              {locale.cancel}
            </Button>
            <Button
              variant="outline"
              color="red"
              styles={{
                label: {
                  fontWeight: 'normal',
                  fontSize: 'var(--font-size-s)',
                },
              }}
              onClick={() => handleDelete()}
            >
              {locale.delete}
            </Button>
          </Group>
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(DeleteModal);
