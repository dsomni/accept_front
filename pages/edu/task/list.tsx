import { ITaskDisplay } from '@custom-types/ITask';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactNode, useEffect, useState } from 'react';

function TaskList() {
  const [list, setList] = useState<ITaskDisplay[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetch('/api/tasks/list').then((res) => {
      if (res.status == 200) {
        res.json().then((res) => setList(res));
        return;
      }
      res.json().then((res) => setError(res));
    });
  }, []);

  return (
    <div>
      {list && list.map((item, index) => <div key={index}>{item.title}</div>)}
    </div>
  );
}

TaskList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TaskList;
