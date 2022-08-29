import { IUser } from '@custom-types/data/IUser';
import { useLocale } from '@hooks/useLocale';
import { useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput } from '@ui/basics';
import { FC, memo, useCallback } from 'react';
import styles from './settings.module.css';
import { requestWithNotify } from '@utils/requestWithNotify';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

const Settings: FC<{ user: IUser }> = ({ user }) => {
  const { locale, lang } = useLocale();

  const main_form = useForm({
    initialValues: {
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      email: user.email,
    },
    validate: {
      email: (value: any) =>
        (value || value.length > 0) &&
        !value.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ? locale.auth.errors.email
          : null,
    },
  });

  const password_form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) =>
        value.length < 5
          ? locale.auth.errors.password.len
          : !value.match(/^[a-zA-Z\d\.]+$/)
          ? locale.auth.errors.password.symbols
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? locale.auth.errors.confirm : null,
    },
  });

  const handleMain = useCallback(() => {
    if (
      Object.keys(main_form.errors).length > 0 ||
      main_form.validate().hasErrors
    ) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.validationError,
        autoClose: 5000,
      });
      return;
    }
    const body = main_form.values;
    requestWithNotify<
      {
        name: string;
        surname: string;
        patronymic: string;
        email?: string;
      },
      {}
    >(
      'profile/edit',
      'POST',
      locale.notify.profile.main,
      lang,
      (_) => '',
      body,
      () => window.location.reload()
    );
  }, [main_form, lang, locale]);

  const handlePassword = useCallback(() => {
    if (
      Object.keys(password_form.errors).length > 0 ||
      password_form.validate().hasErrors
    ) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.validationError,
        autoClose: 5000,
      });
      return;
    }
    const body = { password: password_form.values.password };
    requestWithNotify<{ password: string }, {}>(
      'profile/password',
      'POST',
      locale.notify.profile.password,
      lang,
      (_) => '',
      body
    );
  }, [password_form, lang, locale]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <TextInput
          label={locale.auth.labels.name}
          classNames={{
            label: styles.label,
          }}
          size="lg"
          onBlur={() => main_form.validateField('name')}
          {...main_form.getInputProps('name')}
        />
        <TextInput
          label={locale.auth.labels.surname}
          classNames={{
            label: styles.label,
          }}
          size="lg"
          onBlur={() => main_form.validateField('surname')}
          {...main_form.getInputProps('surname')}
        />
        <TextInput
          label={locale.auth.labels.patronymic}
          classNames={{
            label: styles.label,
          }}
          size="lg"
          onBlur={() => main_form.validateField('patronymic')}
          {...main_form.getInputProps('patronymic')}
        />
        <TextInput
          label={locale.auth.labels.email}
          classNames={{
            label: styles.label,
          }}
          size="lg"
          onBlur={() => main_form.validateField('email')}
          {...main_form.getInputProps('email')}
        />
        <div className={styles.button}>
          <Button
            disabled={!main_form.isValid()}
            onClick={handleMain}
          >
            {locale.save}
          </Button>
        </div>
      </div>
      <div className={styles.password}>
        <PasswordInput
          label={locale.auth.labels.password}
          placeholder={locale.auth.placeholders.password}
          classNames={{
            label: styles.label,
          }}
          helperContent={
            <div>
              {locale.helpers.auth.password.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          }
          size="lg"
          onBlur={() => password_form.validateField('password')}
          {...password_form.getInputProps('password')}
        />
        <PasswordInput
          label={locale.auth.labels.confirmPassword}
          placeholder={locale.auth.placeholders.password}
          classNames={{
            label: styles.label,
          }}
          size="lg"
          onBlur={() =>
            password_form.validateField('confirmPassword')
          }
          {...password_form.getInputProps('confirmPassword')}
        />
        <div className={styles.button}>
          <Button
            disabled={!password_form.isValid()}
            type="button"
            onClick={handlePassword}
          >
            {locale.save}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Settings);
