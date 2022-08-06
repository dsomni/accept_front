import { useLocale } from '@hooks/useLocale';
import { FC, memo, useEffect } from 'react';
import { pureCallback } from '@custom-types/ui/atomic';
import { IAssignmentSchemaDisplay } from '@custom-types/data/IAssignmentSchema';
import { IGroup } from '@custom-types/data/IGroup';
import MainInfo from './MainInfo/MainInfo';
import Groups from './Groups/Groups';
import Origin from './Origin/Origin';
import Stepper from '@ui/Stepper/Stepper';

const stepFields = [
  ['startDate', 'startTime', 'endDate', 'endTime', 'dates'],
  ['groups'],
  ['origin'],
];

const Form: FC<{
  form: any;
  handleSubmit: pureCallback<void>;
  buttonLabel: string;
  groups: IGroup[];
  assignment_schemas: IAssignmentSchemaDisplay[];
}> = ({
  form,
  handleSubmit,
  buttonLabel,
  groups,
  assignment_schemas,
}) => {
  const { locale } = useLocale();

  return (
    <>
      <Stepper
        buttonLabel={buttonLabel}
        form={form}
        handleSubmit={handleSubmit}
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
