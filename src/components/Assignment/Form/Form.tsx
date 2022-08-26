import { useLocale } from '@hooks/useLocale';
import { FC, memo, useEffect } from 'react';
import { callback } from '@custom-types/ui/atomic';
import { IAssignmentSchemaDisplay } from '@custom-types/data/IAssignmentSchema';
import { IGroup } from '@custom-types/data/IGroup';
import MainInfo from './MainInfo/MainInfo';
import Groups from './Groups/Groups';
import Origin from './Origin/Origin';
import Stepper from '@ui/Stepper/Stepper';
import { UseFormReturnType, useForm } from '@mantine/form';

const stepFields = [
  ['startDate', 'startTime', 'endDate', 'endTime', 'dates'],
  ['groups'],
  ['origin'],
];

const Form: FC<{
  handleSubmit: callback<UseFormReturnType<any>>;
  initialValues: any;
  buttonLabel: string;
  groups: IGroup[];
  assignment_schemas: IAssignmentSchemaDisplay[];
}> = ({
  handleSubmit,
  initialValues,
  buttonLabel,
  groups,
  assignment_schemas,
}) => {
  const { locale } = useLocale();

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]); //eslint-disable-line

  const form = useForm({
    initialValues,
    validate: {
      origin: (value) =>
        value.length == 0
          ? locale.assignment.form.validation.origin
          : null,
      startDate: (value, values) =>
        !values.startDate
          ? locale.assignment.form.validation.startDate
          : values.infinite
          ? null
          : !values.endDate
          ? locale.assignment.form.validation.endDate
          : null,
      dates: (value, values) =>
        values.infinite
          ? null
          : values.startDate &&
            values.endDate &&
            values.startDate.getTime() + values.startTime.getTime() >=
              values.endDate.getTime() + values.endTime.getTime()
          ? locale.assignment.form.validation.date
          : null,
      groups: (value) =>
        value.length == 0
          ? locale.assignment.form.validation.groups
          : null,
    },
  });

  return (
    <>
      <Stepper
        buttonLabel={buttonLabel}
        initialStep={0}
        form={form}
        handleSubmit={() => handleSubmit(form)}
        stepFields={stepFields}
        pages={[
          <MainInfo key={0} form={form} />,
          <Groups key={1} form={form} groups={groups} />,
          <Origin
            key={2}
            form={form}
            assignmentSchemas={assignment_schemas}
          />,
        ]}
        labels={locale.assignment.form.steps.labels}
        descriptions={locale.assignment.form.steps.descriptions}
      />
    </>
  );
};

export default memo(Form);
