import { useLocale } from '@hooks/useLocale';

import { FC, memo, useCallback, useEffect, useState } from 'react';

import styles from './taskSelector.module.css';
import { sendRequest } from '@requests/request';
import { ITaskDisplay } from '@custom-types/data/ITask';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import { TaskItem } from './TaskItem/TaskItem';
import { setter } from '@custom-types/ui/atomic';

const TaskSelector: FC<{
  initialTasks: Item[];
  setUsed: setter<any>;
  classNames?: object;
}> = ({ setUsed, classNames, initialTasks }) => {
  const { locale } = useLocale();

  const [selectedTasks, setSelectedTasks] =
    useState<Item[]>(initialTasks);
  const [availableTasks, setAvailableTasks] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    sendRequest<{}, ITaskDisplay[]>(
      'task/list',
      'GET',
      undefined,
      1000
    ).then((res) => {
      if (res.error) return;
      const tasks = res.response;
      let newAvailableTasks: Item[] = [];
      let newSelectedTasks: Item[] = [];

      for (let i = 0; i < tasks.length; i++) {
        const task = {
          value: tasks[i].spec,
          label: tasks[i].title,
        };
        if(!selectedTasks.includes(task)){
          newAvailableTasks.push(task)
        }else{
          newSelectedTasks.push(task)
        }
      }
      setSelectedTasks(newSelectedTasks);
      setAvailableTasks(newAvailableTasks);
      setLoading(false);
    });
  }, [selectedTasks]);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  const itemComponent = useCallback(
    (item: any, handleSelect: any) => {
      return (
        <TaskItem
          item={item}
          onSelect={() => handleSelect(item)}
          refetch={refetch}
        />
      );
    },
    [refetch]
  );

  return (
    <div className={styles.wrapper}>
      {!loading && (
        <CustomTransferList
          defaultOptions={availableTasks}
          defaultChosen={selectedTasks}
          setUsed={setUsed}
          classNames={classNames ? classNames : {}}
          titles={[
            locale.assignmentSchema.form.taskSelector.available,
            locale.assignmentSchema.form.taskSelector.used,
          ]}
          itemComponent={itemComponent}
        />
      )}
    </div>
  );
};

export default memo(TaskSelector);
