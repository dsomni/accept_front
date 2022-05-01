import { callback } from '@custom-types/atomic';
import { IFormField } from '@custom-types/IFormField';
import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC, memo, useMemo, useCallback, useEffect } from 'react';
import styles from './simpleForm.module.css';

const SimpleForm: FC<{
  fields: IFormField[];
  onSubmit: callback<any, void>;
  buttonText: string;
}> = ({ fields, onSubmit, buttonText }) => {
  const formValues = useMemo(() => {
    let values: { [_: string]: string | undefined } = {};
    for (let i = 0; i < fields.length; i++) {
      values[fields[i].name] = fields[i].initialValue;
    }
    return values;
  }, [fields]);

  const form = useForm({
    initialValues: formValues,
  });

  const submit = useCallback(() => {
    onSubmit(form.values);
  }, [form.values, onSubmit]);

  return (
    <form onSubmit={() => {}} className={styles.wrapper}>
      {fields.map((field, index) => (
        <div key={index} className={field.className}>
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            classNames={{
              label: styles.label,
            }}
            {...form.getInputProps(field.name)}
          />
        </div>
      ))}
      <div className={styles.buttons}>
        <Button
          color="green"
          variant="filled"
          type="button"
          onClick={submit}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default memo(SimpleForm);
