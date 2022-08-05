import { FC, memo } from 'react';
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
        form={form}
        field={'origin'}
        schemas={assignmentSchemas}
      />
    </>
  );
};

export default memo(Origin);
