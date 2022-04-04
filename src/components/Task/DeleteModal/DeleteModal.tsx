import { ITask } from '@custom-types/ITask';
import { Modal } from '@mantine/core';
import { sendRequest } from '@requests/request';
import { FC, memo, useEffect, useState } from 'react';

const DeleteModal: FC<{
  title: string;
  active: boolean;
  setActive: (_: boolean) => void;
  task: string;
}> = ({ title, active, setActive, task }) => {
  const [lessons, setLessons] = useState<ITask[]>([]);

  useEffect(() => {
    let cleanUp = false;

    sendRequest<{}, ITask[]>(
      `/tasks/connected_assignments/${task}`,
      'POST'
    ).then((res) => {
      if (res && !cleanUp) {
        setLessons(res);
      }
    });

    return () => {
      cleanUp = true;
    };
  }, [task]);

  return (
    <Modal
      opened={active}
      onClose={() => setActive(false)}
      title={title}
    >
      {lessons.map((lesson, index) => (
        <div key={index}>{lesson.title}</div>
      ))}
    </Modal>
  );
};

export default memo(DeleteModal);
