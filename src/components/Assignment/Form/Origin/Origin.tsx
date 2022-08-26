import { FC, memo, useEffect } from 'react';
import { IAssignmentSchemaDisplay } from '@custom-types/data/IAssignmentSchema';
import styles from './origin.module.css';
import { AssignmentSchemaSelector } from '@ui/selectors';

const Origin: FC<{
  form: any;
  assignmentSchemas: IAssignmentSchemaDisplay[];
}> = ({ form, assignmentSchemas }) => {
  return (
    <>
      <AssignmentSchemaSelector
        key={2}
        form={form}
        field={'origin'}
        schemas={assignmentSchemas}
      />
    </>
  );
};

export default memo(Origin);
