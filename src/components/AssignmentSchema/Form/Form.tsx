import { useLocale } from '@hooks/useLocale';
import { FC, memo } from 'react';
import MainInfo from './MainInfo/MainInfo';
import TaskAdding from './TaskAdding/TaskAdding';
import Preview from './Preview/Preview';
import { TaskOrdering } from './TaskOrdering/TaskOrdering';
import { pureCallback } from '@custom-types/ui/atomic';
import Stepper from '@ui/Stepper/Stepper';

const stepFields = [
  ['title', 'description', 'tags', 'defaultDuration'],
  ['tasks'],
  [],
  [],
];

const Form: FC<{
  form: any;
  handleSubmit: pureCallback<void>;
  buttonLabel: string;
}> = ({ form, handleSubmit, buttonLabel }) => {
  const { locale } = useLocale();

  return (
    <>
      <Stepper
        stepFields={stepFields}
        form={form}
        buttonLabel={buttonLabel}
        handleSubmit={handleSubmit}
        pages={[
          <MainInfo key={'0'} form={form} />,
          <TaskAdding
            key={'1'}
            form={form}
            initialTasks={form.values.tasks}
          />,
          <TaskOrdering key={'2'} form={form} />,
          <Preview key={'3'} form={form} />,
        ]}
        labels={locale.assignmentSchema.form.steps.labels}
        descriptions={locale.assignmentSchema.form.steps.descriptions}
      />
    </>
  );
};

export default memo(Form);
