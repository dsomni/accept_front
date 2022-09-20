import { FC, memo, useEffect, useState } from 'react';
import { CustomDraggableList } from '@ui/CustomDraggableList/CustomDraggableList';
import { useLocale } from '@hooks/useLocale';
import styles from './taskOrdering.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { ITaskDisplay } from '@custom-types/data/ITask';
import { sendRequest } from '@requests/request';

const TaskOrdering: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const [tasks, setTasks] = useState<Map<string, ITaskDisplay>>();

  useEffect(() => {
    sendRequest<string[], ITaskDisplay[]>(
      'task/list-specs',
      'POST',
      form.values.tasks
    ).then((res) => {
      if (!res.error) {
        setTasks(
          new Map(res.response.map((task) => [task.spec, task]))
        );
      }
    });
  }, []); // eslint-disable-line

  return (
    <>
      {form.values.tasks.length == 0 ? (
        <>{locale.tournament.form.zeroTask}</>
      ) : (
        <>
          <div className={stepperStyles.label}>
            {locale.tournament.form.taskOrdering}
          </div>
          <CustomDraggableList
            values={
              (tasks &&
                form.values.tasks.map((spec: string) => {
                  let task = tasks.get(spec);
                  return {
                    label: task?.title,
                    value: spec,
                  };
                })) ||
              []
            }
            setValues={(values) =>
              form.setFieldValue(
                'tasks',
                values.map((value) => value.value)
              )
            }
            classNames={{
              wrapper: styles.wrapperList,
              label: stepperStyles.label,
              itemWrapper: styles.itemWrapper,
              dragButton: styles.dragButton,
            }}
          />
        </>
      )}
    </>
  );
};

export default memo(TaskOrdering);
