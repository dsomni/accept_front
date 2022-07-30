import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { FC, memo } from 'react';
import { TaskSelector } from '@ui/selectors';
import styles from './taskAdding.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { InputWrapper } from '@ui/basics';

const TaskAdding: FC<{ form: any; initialTasks: Item[] }> = ({
  form,
  initialTasks,
}) => {
  return (
    <>
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
    </>
  );
};

export default memo(TaskAdding);
