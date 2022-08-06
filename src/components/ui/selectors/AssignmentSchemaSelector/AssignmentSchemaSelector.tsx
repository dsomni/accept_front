import { FC, memo } from 'react';
import styles from './assignmentSchemaSelector.module.css';
import { IAssignmentSchemaDisplay } from '@custom-types/data/IAssignmentSchema';
import { Select } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';

const AssignmentSchemaSelector: FC<{
  form: any;
  field: string;
  schemas: IAssignmentSchemaDisplay[];
}> = ({ form, schemas, field }) => {
  const { locale } = useLocale();
  return (
    <Select
      label={locale.ui.schemasSelector.label}
      data={schemas.map((schema) => ({
        value: schema.spec,
        label: schema.title,
      }))}
      {...form.getInputProps(field)}
    />
  );
};

export default memo(AssignmentSchemaSelector);
