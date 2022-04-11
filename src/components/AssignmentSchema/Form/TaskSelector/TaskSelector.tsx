import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useCallback, useEffect, useState } from 'react';

import styles from './taskSelector.module.css';
import { sendRequest } from '@requests/request';
import { ITaskDisplay } from '@custom-types/ITask';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import { TaskItem } from './TaskItem/TaskItem';

const TaskSelector: FC<{
  initialTasks: Item[];
  setUsed: (_: any) => void;
  classNames?: object;
}> = ({ setUsed, classNames, initialTasks }) => {
  const { locale } = useLocale();

  const [selectedTasks, setSelectedTasks] =
    useState<Item[]>(initialTasks);
  const [availableTasks, setAvailableTasks] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    sendRequest<{}, ITaskDisplay[]>('tasks/list', 'GET').then(
      (res) => {
        if (!res) return;
        const tasks = new Map<string, ITaskDisplay>();
        for (let i = 0; i < res.length; i++) {
          tasks.set(res[i].spec, res[i]);
        }
        // setTasks(
        //   assignment.tasks.map(
        //     (spec) => tasks.get(spec) || null!
        //   )
        // );
        let newAvailableTasks: Item[] = [];
        let newSelectedTasks: Item[] = [];
        let task;
        let selectedSpecs = selectedTasks.map((item) => item.value);

        selectedSpecs.map((spec: string) => {
          const task = tasks.get(spec);
          if (task) {
            newSelectedTasks.push({
              value: task.spec,
              label: task.title,
            });
          }
        });

        for (let i = 0; i < res.length; i++) {
          task = {
            value: res[i].spec,
            label: res[i].title,
          };
          if (!selectedSpecs.includes(task.value)) {
            newAvailableTasks.push(task);
          }
        }
        setSelectedTasks(newSelectedTasks);
        setAvailableTasks(newAvailableTasks);
        setLoading(false);
      }
    );
  }, [selectedTasks]);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  const itemComponent = useCallback(
    (item, handleSelect) => {
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
            capitalize(
              locale.assignmentSchema.form.taskSelector.available
            ),
            capitalize(
              locale.assignmentSchema.form.taskSelector.used
            ),
          ]}
          itemComponent={itemComponent}
        />
      )}
    </div>
  );
};

export default memo(TaskSelector);
