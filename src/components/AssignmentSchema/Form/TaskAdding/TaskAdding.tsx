import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { FC, memo } from 'react';
import TaskSelector from '../TaskSelector/TaskSelector';
import styles from './taskAdding.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { InputWrapper } from '@ui/basics';

const TaskAdding: FC<{ form: any; initialTasks: Item[] }> = ({
  form,
  initialTasks,
}) => {
  return (
    <>
      <div className={stepperStyles.wrapper}>
        <InputWrapper {...form.getInputProps('tasks')}>
          <TaskSelector
            classNames={{
              label: stepperStyles.label,
            }}
            initialTasks={initialTasks}
            setUsed={(value) => {
              form.setFieldValue('tasks', value);
            }}
          />
        </InputWrapper>
      </div>
    </>
  );
};

export default memo(TaskAdding);
