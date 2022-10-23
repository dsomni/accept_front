import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { FC, memo } from 'react';
import { TaskSelector } from '@ui/selectors';
import { InputWrapper } from '@ui/basics';

const TaskAdding: FC<{ form: any; initialTasks: Item[] }> = ({
  form,
  initialTasks,
}) => {
  return (
    <>
      <InputWrapper {...form.getInputProps('tasks')}>
        <TaskSelector
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
