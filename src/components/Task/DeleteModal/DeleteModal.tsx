import { ITaskDisplay } from '@custom-types/data/ITask';
import { IAssignmentSchemaDisplay } from '@custom-types/data/IAssignmentSchema';
import { useLocale } from '@hooks/useLocale';
import { sendRequest } from '@requests/request';
import Link from 'next/link';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { callback } from '@custom-types/ui/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import { Button } from '@ui/basics';
import deleteModalStyles from '@styles/ui/deleteModal.module.css';
import modalStyles from '@styles/ui/modal.module.css';
import SimpleButtonGroup from '@ui/SimpleButtonGroup/SimpleButtonGroup';

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
        title={locale.task.modals.deletion}
      >
        <div className={modalStyles.verticalContent}>
          <div>
            {locale.task.modals.delete + ` '${task.title}' ?`}
          </div>
          {assignments.length > 0 && (
            <div>
              <div>
                {locale.task.modals.usedInAssignments +
                  ` (${assignments.length}):`}
              </div>
              <br />
              <div className={deleteModalStyles.list}>
                {assignments.map((assignment, index) => (
                  <div key={index}>
                    <Link
                      href={`/edu/assignment/${assignment.spec}`}
                      className={deleteModalStyles.link}
                      target="_blank"
                    >
                      {assignment.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!toList ? (
            <SimpleButtonGroup
              reversePositive
              actionButton={{
                label: locale.delete,
                onClick: handleDelete,
              }}
              cancelButton={{
                label: locale.cancel,
                onClick: () => setActive(false),
              }}
            />
          ) : (
            <Button
              variant="outline"
              href="/task/list"
              targetWrapperClassName={deleteModalStyles.toListButton}
            >
              {locale.toList}
            </Button>
          )}
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(DeleteModal);
