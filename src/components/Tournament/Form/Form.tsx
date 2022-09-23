import { FC, memo, useEffect } from 'react';
import { useLocale } from '@hooks/useLocale';
import { callback } from '@custom-types/ui/atomic';
import Stepper from '@ui/Stepper/Stepper';
import { UseFormReturnType, useForm } from '@mantine/form';
import MainInfo from './MainInfo/MainInfo';
import { IAssessmentType } from '@custom-types/data/atomic';
import { IUserDisplay } from '@custom-types/data/IUser';
import Dates from './Dates/Dates';
import TaskOrdering from './TaskOrdering/TaskOrdering';
import Moderators from './Moderators/Moderators';
import Preview from './Preview/Preview';

const stepFields: string[][] = [
  [
    'title',
    'description',
    'tags',
    'assessmentType',
    'allowRegistrationAfterStart',
    'shouldPenalizeAttempt',
  ],
  [
    'startDate',
    'startTime',
    'endDate',
    'endTime',
    'frozeResultsDate',
    'frozeResultsTime',
  ],
  [], // task ordering
  ['moderators'],
  [], // preview
];

const Form: FC<{
  handleSubmit: callback<UseFormReturnType<any>>;
  initialValues: any;
  buttonLabel: string;
  assessmentTypes: IAssessmentType[];
  users: IUserDisplay[];
}> = ({
  handleSubmit,
  initialValues,
  buttonLabel,
  assessmentTypes,
  users,
}) => {
  const { locale } = useLocale();

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]); //eslint-disable-line

  const form = useForm({
    initialValues,
    validateInputOnBlur: true,
  });

  return (
    <>
      <Stepper
        buttonLabel={buttonLabel}
        form={form}
        handleSubmit={() => handleSubmit(form)}
        stepFields={stepFields}
        initialStep={4}
        pages={[
          <MainInfo
            key={'0'}
            form={form}
            assessmentTypes={assessmentTypes}
          />,
          <Dates key={'1'} form={form} />,
          <TaskOrdering key={'2'} form={form} />,
          <Moderators key={'3'} form={form} users={users} />,
          <Preview key={'4'} tournament={form.values} />,
        ]}
        labels={locale.tournament.form.steps.labels}
        descriptions={locale.tournament.form.steps.descriptions}
      />
    </>
  );
};

export default memo(Form);
