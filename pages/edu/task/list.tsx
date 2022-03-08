import { ITaskDisplay } from '@custom-types/ITask';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { sendRequest } from '@requests/request';
import { ReactNode, useEffect, useState } from 'react';

function TaskList() {
  const [list, setList] = useState<ITaskDisplay[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    sendRequest<{}, ITaskDisplay[]>('tasks/list', 'GET').then(
      (res) => {
        if (res) {
          return setList(res);
        }
        setError(true);
      }
    );
  }, []);

  return (
    <div>
      {list &&
        list.map((item, index) => (
          <div key={index}>{item.title}</div>
        ))}
    </div>
  );
}

TaskList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TaskList;
