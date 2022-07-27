import { LoginLayout } from '@layouts/LoginLayout';
import { ReactElement, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import {
  Button,
  PasswordInput,
  Stepper,
  TextInput,
  Group,
} from '@mantine/core';
import styles from '@styles/auth/login.module.css';
import Link from 'next/link';
import {
  newNotification,
  errorNotification,
} from '@utils/notificationFunctions';
import { IRegUser, IUser } from '@custom-types/data/IUser';
import { requestWithNotify } from '@utils/requestWithNotify';
import { sendRequest } from '@requests/request';
import { AlertCircle } from 'tabler-icons-react';

const stepFields = [
  ['login'],
  ['password', 'confirmPassword'],
  ['name', 'email'],
];

type formFields =
  | 'login'
  | 'password'
  | 'confirmPassword'
  | 'name'
  | 'email';
function SignUp() {
  const { locale, lang } = useLocale();
  const router = useRouter();

  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      login: '',
      password: '',
      email: '',
      name: '',
      confirmPassword: '',
    },
    validate: {
      login: (value) =>
        value.length < 5
          ? locale.auth.errors.login.len
          : !value.match(/^[a-z]+$/)
          ? locale.auth.errors.login.symbols
          : null,
      password: (value) =>
        value.length < 5
          ? locale.auth.errors.password.len
          : !value.match(/^[a-zA-Z\d\.]+$/)
          ? locale.auth.errors.password.symbols
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? locale.auth.errors.confirm : null,
      email: (value) =>
        !value.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ? locale.auth.errors.email
          : null,
      name: (value) =>
        value.length > 50
          ? locale.auth.errors.name.len
          : value.split(' ').length < 2
          ? locale.auth.errors.name.surname
          : null,
    },
  });

  const nextStep = useCallback(
    () =>
      setActive((current) => {
        for (let i = 0; i < stepFields[current].length; i++) {
          const field = stepFields[current][i] as formFields;
          form.validate();
          form.validateField(field);
          if (form.errors[field]) {
            return current;
          }
        }
        return current < 3 ? current + 1 : current;
      }),
    [form]
  );
  const prevStep = useCallback(
    () =>
      setActive((current) => (current > 0 ? current - 1 : current)),
    []
  );

  const getErrorsStep = useCallback(
    (step: number) => {
      let error = false;
      for (let i = 0; i < stepFields[step].length; i++) {
        const field = stepFields[step][i];
        if (form.errors[field]) {
          error = true;
          break;
        }
      }
      return error;
    },
    [form.errors]
  );

  const onLoginBlur = useCallback(() => {
    if (!form.validateField('login').hasError)
      sendRequest<undefined, boolean>(
        `auth/validateLogin/${form.values.login}`,
        'GET',
        undefined,
        60000
      ).then((res) => {
        form.setFieldError(
          'login',
          !res.error && !res.response
            ? locale.auth.errors.login.used
            : null
        );
      });
  }, [form.values.login]);

  const handleSignUp = useCallback(() => {
    if (
      Object.keys(form.errors).length > 0 ||
      form.validate().hasErrors
    ) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.notify.auth.validation,
        autoClose: 5000,
      });
      return;
    }
    const name = form.values.name.split(' ');
    const user: IRegUser = {
      login: form.values.login,
      password: form.values.password,
      email: form.values.email,
      name: name[1],
      surname: name[0],
      patronymic: name.length > 2 ? name[2] : '',
    };

    requestWithNotify<IRegUser, IUser>(
      'auth/signup',
      'POST',
      locale.notify.auth.signUp,
      lang,
      (user) => user.shortName,
      user,
      () => router.push(`/signin?referrer=${router.query.referrer}`)
    );
  }, [locale, form, router]);

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        // className={stepperStyles.stepper}
        size="xl"
      >
        <Stepper.Step
          label={locale.auth.stepper.login}
          icon={
            getErrorsStep(0) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(0) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(0) ? 'red' : undefined}
        >
          <TextInput
            required
            id="login"
            label={locale.auth.labels.login}
            placeholder={locale.auth.placeholders.login}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            onBlur={onLoginBlur}
            {...form.getInputProps('login')}
          />
        </Stepper.Step>
        <Stepper.Step
          label={locale.auth.stepper.password}
          icon={
            getErrorsStep(1) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(1) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(1) ? 'red' : undefined}
        >
          <PasswordInput
            required
            id="password"
            label={locale.auth.labels.password}
            placeholder={locale.auth.placeholders.password}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            onBlur={() => form.validateField('password')}
            {...form.getInputProps('password')}
          />
          <PasswordInput
            required
            id="confirmPassword"
            label={locale.auth.labels.password}
            placeholder={locale.auth.placeholders.password}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            onBlur={() => form.validateField('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
          />
        </Stepper.Step>
        <Stepper.Step
          label={locale.auth.stepper.final}
          icon={
            getErrorsStep(2) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(2) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(2) ? 'red' : undefined}
        >
          <TextInput
            required
            id="name"
            label={locale.auth.labels.name}
            placeholder={locale.auth.placeholders.name}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            onBlur={() => form.validateField('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            required
            id="email"
            label={locale.auth.labels.email}
            placeholder={locale.auth.placeholders.email}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            onBlur={() => form.validateField('email')}
            {...form.getInputProps('email')}
          />
        </Stepper.Step>
      </Stepper>
      <Group position="center" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            {locale.form.back}
          </Button>
        )}
        <Button
          onClick={active !== 2 ? nextStep : handleSignUp}
          disabled={getErrorsStep(active)}
        >
          {active !== 2
            ? locale.form.next
            : locale.auth.footer.register}
        </Button>
      </Group>
      <div className={styles.footer}>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>
            {locale.auth.footer.hasAccount}
          </span>
          <Link href={`/signin?referrer=${router.query.referrer}`}>
            <a className={styles.footerLink}>
              {locale.auth.footer.login}
            </a>
          </Link>
        </div>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>
            {locale.auth.footer.returnTo}
          </span>
          <Link href="/">
            <a className={styles.footerLink}>
              {locale.auth.footer.mainPage}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

SignUp.getLayout = (page: ReactElement) => {
  return <LoginLayout title={'registration'}>{page}</LoginLayout>;
};
export default SignUp;
