import { callback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { FC, useEffect, useState } from 'react';
import styles from './form.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { IUser } from '@custom-types/data/IUser';
import { TextInput, Button, Switch } from '@ui/basics';

import { UserSelector } from '@ui/selectors';
import { useUser } from '@hooks/useUser';
import { useForm, UseFormReturnType } from '@mantine/form';

const Form: FC<{
  buttonText: string;
  users: IUser[];
  handleSubmit: callback<UseFormReturnType<any>>;
  initialValues: any;
}> = ({ initialValues, handleSubmit, buttonText, users }) => {
  const [hasErrors, setHasErrors] = useState(false);

  const { locale } = useLocale();
  const { isAdmin } = useUser();

  const form = useForm({
    initialValues,
    validate: {
      name: (value) =>
        value.length < 5 ? locale.group.form.validation.name : null,
      members: (value) =>
        value.length < 2
          ? locale.group.form.validation.members
          : null,
    },
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]); //eslint-disable-line

  useEffect(() => {
    if (Object.keys(form.errors).length > 0) {
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  }, [form.errors]);

  return (
    <div className={stepperStyles.wrapper}>
      <TextInput
        label={locale.group.name}
        classNames={{
          label: stepperStyles.label,
        }}
        required
        disabled={form.values.readonly}
        onBlur={() => form.validateField('name')}
        {...form.getInputProps('name')}
      />

      {isAdmin && (
        <div style={{ width: 'fit-content' }}>
          <Switch
            label={locale.group.readonly}
            {...form.getInputProps('readonly', { type: 'checkbox' })}
          />
        </div>
      )}

      <UserSelector
        form={form}
        users={users}
        initialUsers={form.values.members}
        field={'members'}
      />
      <div className={styles.buttonWrapper}>
        <Button
          color="var(--primary)"
          onClick={() => handleSubmit(form)}
          disabled={hasErrors}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Form;
