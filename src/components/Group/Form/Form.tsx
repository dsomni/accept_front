import { callback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { FC, useCallback, useEffect, useMemo } from 'react';
import styles from './form.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import { IUser } from '@custom-types/data/IUser';
import {
  Button,
  Helper,
  InputWrapper,
  Switch,
  TextInput,
} from '@ui/basics';

import { UserSelector } from '@ui/selectors';
import { useUser } from '@hooks/useUser';
import { UseFormReturnType, useForm } from '@mantine/form';

const Form: FC<{
  buttonText: string;
  users: IUser[];
  handleSubmit: callback<UseFormReturnType<any>>;
  initialValues: any;
}> = ({ initialValues, handleSubmit, buttonText, users }) => {
  const { locale } = useLocale();
  const { isAdmin } = useUser();

  const form = useForm({
    initialValues,
    validate: {
      name: (value) =>
        value.length < 3 ? locale.group.form.validation.name : null,
      members: (value) =>
        value.length < 2
          ? locale.group.form.validation.members
          : null,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]); //eslint-disable-line

  const setFieldValue = useCallback(
    (users: string[]) => form.setFieldValue('members', users),
    [] // eslint-disable-line
  );
  const initialProps = useMemo(() => {
    form.getInputProps('members');
  }, []); // eslint-disable-line

  return (
    <div className={stepperStyles.wrapper}>
      <TextInput
        label={locale.group.name}
        classNames={{
          label: stepperStyles.label,
        }}
        required
        disabled={form.values.readonly}
        {...form.getInputProps('name')}
      />

      {isAdmin && (
        <div className={styles.readOnlySwitch}>
          <Switch
            label={locale.group.readonly}
            {...form.getInputProps('readonly', { type: 'checkbox' })}
          />
          <Helper
            dropdownContent={
              <div>
                {locale.helpers.group.readOnly.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            }
          />
        </div>
      )}
      <InputWrapper {...form.getInputProps('members')}>
        <UserSelector
          setFieldValue={setFieldValue}
          inputProps={initialProps}
          users={users}
          initialUsers={form.values.members}
        />
      </InputWrapper>
      <div className={styles.buttonWrapper}>
        <Button
          color="var(--primary)"
          onClick={() => {
            form.validate();
            handleSubmit(form);
          }}
          disabled={Object.keys(form.errors).length !== 0}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Form;
