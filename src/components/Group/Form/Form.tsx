import { pureCallback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { FC, useEffect, useState } from 'react';
import styles from './form.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { IUser } from '@custom-types/data/IUser';
import { TextInput, Button, Switch } from '@ui/basics';

import { UserSelector } from '@ui/selectors';
import { useUser } from '@hooks/useUser';

const Form: FC<{
  form: any;
  handleSubmit: pureCallback;
  buttonText: string;
  users: IUser[];
}> = ({ form, handleSubmit, buttonText, users }) => {
  const [hasErrors, setHasErrors] = useState(false);

  const { locale } = useLocale();
  const { isAdmin } = useUser();

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

      <UserSelector form={form} users={users} field={'members'} />
      <div className={styles.buttonWrapper}>
        <Button
          color="var(--primary)"
          onClick={handleSubmit}
          disabled={hasErrors}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Form;
