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
          <MainInfo form={form} />,
          <TaskAdding form={form} initialTasks={form.values.tasks} />,
          <TaskOrdering form={form} />,
          <Preview form={form} />,
        ]}
        labels={locale.assignmentSchema.form.steps.labels}
        descriptions={locale.assignmentSchema.form.steps.descriptions}
      />
    </>
  );
};

export default memo(Form);
