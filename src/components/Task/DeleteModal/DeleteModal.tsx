import { ITaskDisplay } from '@custom-types/data/ITask';
import { IAssignmentSchemaDisplay } from '@custom-types/data/IAssignmentSchema';
import { useLocale } from '@hooks/useLocale';
import { Group } from '@mantine/core';
import { sendRequest } from '@requests/request';

import Link from 'next/link';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import { callback } from '@custom-types/ui/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { Button } from '@ui/basics';

const DeleteModal: FC<{
  active: boolean;
  setActive: callback<boolean, void>;
  task: ITaskDisplay;
}> = ({ active, setActive, task }) => {
  const [assignments, setAssignments] = useState<
    IAssignmentSchemaDisplay[]
  >([]);
  const { locale, lang } = useLocale();

  const [toList, setToList] = useState(false);

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
      () => setToList(true),
      { autoClose: 8000 }
    );
  }, [task.spec, locale, lang]);

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
              <Button variant="outline" href="/task/list">
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
