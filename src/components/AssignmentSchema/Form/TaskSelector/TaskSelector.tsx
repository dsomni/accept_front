import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useCallback, useEffect, useState } from 'react';

import styles from './taskSelector.module.css';
import { Item } from '@components/Task/Form/TagSelector/CustomTransferList/CustomTransferList';
import { sendRequest } from '@requests/request';
import { CustomTransferList } from '@components/Task/Form/TagSelector/CustomTransferList/CustomTransferList';
import { ITaskDisplay } from '@custom-types/ITask';

const TaskSelector: FC<{
  initialTasks: Item[];
  setUsed: (_: any) => void;
  classNames?: object;
}> = ({ setUsed, classNames, initialTasks }) => {
  const { locale } = useLocale();

  const [selectedTasks, setSelectedTasks] =
    useState<Item[]>(initialTasks);
  const [availableTasks, setAvailableTasks] = useState<Item[]>([]);

  const refetch = useCallback(async () => {
    sendRequest<{}, ITaskDisplay[]>('tasks/list', 'GET').then(
      (tasks) => {
        if (!tasks) return;
        let newAvailableTasks: Item[] = [];
        let newSelectedTasks: Item[] = [];
        let task;
        let selectedSpecs = selectedTasks.map((item) => item.value);
        for (let i = 0; i < tasks.length; i++) {
          task = {
            value: tasks[i].spec,
            label: tasks[i].title,
          };
          if (selectedSpecs.includes(task.value)) {
            newSelectedTasks.push(task);
          } else {
            newAvailableTasks.push(task);
          }
        }
        setSelectedTasks(newSelectedTasks);
        setAvailableTasks(newAvailableTasks);
      }
    );
  }, [selectedTasks]);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      {
        <CustomTransferList
          refetch={refetch}
          options={availableTasks}
          chosen={selectedTasks}
          setUsed={setUsed}
          setChosen={setSelectedTasks}
          setOptions={setAvailableTasks}
          classNames={classNames ? classNames : {}}
          titles={[
            capitalize(locale.tasks.form.tagSelector.available),
            capitalize(locale.tasks.form.tagSelector.used),
          ]}
        />
      }
    </div>
  );
};

export default memo(TaskSelector);
