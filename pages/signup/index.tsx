import { LoginLayout } from '@layouts/LoginLayout';
import { ReactElement, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import styles from '@styles/auth/login.module.css';
import Link from 'next/link';
import {
  newNotification,
  errorNotification,
} from '@utils/notificationFunctions';
import { IRegUser, IUser } from '@custom-types/data/IUser';
import { requestWithNotify } from '@utils/requestWithNotify';
import { sendRequest } from '@requests/request';
import {
  AlertCircle,
  LetterCase,
  ShieldLock,
  AlignJustified,
} from 'tabler-icons-react';
import { TextInput, Button, PasswordInput } from '@ui/basics';
import Stepper from '@ui/Stepper/Stepper';

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
  const [loading, setLoading] = useState(false);

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
          : !value.match(/^[^_]+[a-zA-Z_]+$/)
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
        value.length > 0 &&
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

  const validateStep = useCallback(
    (step: number) => {
      var error = false;
      stepFields[step].forEach((field: string) => {
        const res = form.validateField(field);
        error = error || res.hasError;
      });
      return error;
    },
    [form]
  );

  const nextStep = useCallback(
    () =>
      setActive((current) => {
        if (!validateStep(current)) {
          return current < 2 ? current + 1 : current;
        }
        return current < 3 ? current + 1 : current;
      }),
    [validateStep]
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
    if (!form.validateField('login').hasError) {
      setLoading(true);
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
        setLoading(false);
      });
    }
  }, [form, locale]);

  const handleSignUp = useCallback(() => {
    if (
      Object.keys(form.errors).length > 0 ||
      form.validate().hasErrors
    ) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.validationError,
        autoClose: 5000,
      });
      return;
    }
    const name = form.values.name.split(' ');
    const user: IRegUser = {
      login: form.values.login,
      password: form.values.password,
      email: form.values.email || '',
      name: name[1],
      surname: name[0],
      patronymic: name.length > 2 ? name[2] : '',
    };

    requestWithNotify<IRegUser, IUser>(
      'auth/signup',
      'POST',
      locale.notify.auth.signUp,
      lang,
      (user) => '',
      user,
      () => router.push(`/signin?referrer=${router.query.referrer}`)
    );
  }, [locale, lang, form, router]);

  const onStepperChange = useCallback(
    (newStep: number) => {
      if (newStep !== 0) onLoginBlur();
      if (newStep < active || !validateStep(active)) {
        setActive(newStep);
      }
    },
    [active, validateStep, onLoginBlur]
  );

  return (
    <>
      <Stepper
        handleSubmit={handleSignUp}
        buttonLabel={locale.auth.footer.register}
        contentClass={styles.formWrapper}
        customWrapper
        iconPosition="left"
        form={form}
        stepFields={stepFields}
        icons={[
          <LetterCase key="0" />,
          <ShieldLock key="1" />,
          <AlignJustified key="2" />,
        ]}
        descriptions={['', '', '']}
        labels={locale.auth.steps.labels}
        pages={[
          <>
            <TextInput
              id="login"
              required
              label={locale.auth.labels.login}
              placeholder={locale.auth.placeholders.login}
              classNames={{
                label: styles.label,
              }}
              helperContent={
                <div>
                  {locale.helpers.auth.login.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              }
              size="lg"
              onBlur={onLoginBlur}
              {...form.getInputProps('login')}
            />
          </>,
          <>
            <PasswordInput
              id="password"
              required
              label={locale.auth.labels.password}
              placeholder={locale.auth.placeholders.password}
              classNames={{
                label: styles.label,
              }}
              size="lg"
              helperContent={
                <div>
                  {locale.helpers.auth.password.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              }
              onBlur={() => form.validateField('password')}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              id="confirmPassword"
              required
              label={locale.auth.labels.confirmPassword}
              placeholder={locale.auth.placeholders.password}
              classNames={{
                label: styles.label,
              }}
              size="lg"
              onBlur={() => form.validateField('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
            />
          </>,
          <>
            <TextInput
              id="name"
              required
              label={locale.auth.labels.fullName}
              placeholder={locale.auth.placeholders.fullName}
              classNames={{
                label: styles.label,
              }}
              size="lg"
              onBlur={() => form.validateField('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              id="email"
              label={locale.auth.labels.email}
              placeholder={locale.auth.placeholders.email}
              classNames={{
                label: styles.label,
              }}
              size="lg"
              onBlur={() => form.validateField('email')}
              {...form.getInputProps('email')}
            />
          </>,
        ]}
      />
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
