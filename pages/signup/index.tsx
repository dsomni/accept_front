import CustomEditor from '@ui/CustomEditor/CustomEditor';
import { LoginLayout } from '@layouts/LoginLayout';
import {
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { showNotification } from '@mantine/notifications';
import { defaultClassNames } from '@constants/NotificationClassNames';
import Head from 'next/head';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/hooks';
import { capitalize } from '@utils/capitalize';
import {
  Button,
  PasswordInput,
  Stepper,
  TextInput,
  Group,
} from '@mantine/core';
import styles from '@styles/auth/login.module.css';
import stepperStyles from '@styles/ui/stepper.module.css';
import Link from 'next/link';
import {
  newNotification,
  successNotification,
  errorNotification,
} from '@utils/notificationFunctions';
import { sendRequest } from '@requests/request';
import { IRegUser, IUser } from '@custom-types/IUser';

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
  const { locale } = useLocale();
  const router = useRouter();
  const { user, signIn } = useUser();

  const [hasErrors, setHasErrors] = useState(true);
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => {
      for (let i = 0; i < stepFields[current].length; i++) {
        const field = stepFields[current][i] as formFields;
        form.validateField(field);
        console.log(form.errors);
        if (form.errors[field] !== null) {
          setHasErrors(true);
          return current;
        }
      }
      setHasErrors(false);
      return current < 3 ? current + 1 : current;
    });
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      login: '',
      password: '',
      email: '',
      name: '',
      confirmPassword: '',
    },
    validationRules: {
      login: (value) => value.trim().length > 4,
      password: (value) => value.trim().length > 4,
      confirmPassword: (value) => value.trim().length > 4,
      email: (value) => value.trim().length > 4,
      name: (value) => value.trim().length > 4,
    },
    errorMessages: {
      login: capitalize(locale.auth.errors.login),
      password: capitalize(locale.auth.errors.password),
      email: capitalize(locale.auth.errors.email),
      name: capitalize(locale.auth.errors.name),
    },
  });

  useEffect(() => {
    form.validate();
  }, []); //eslint-disable-line

  const handleSignUp = useCallback(() => {
    if (form.validate()) {
      const user: IRegUser = {
        login: form.values.login,
        password: form.values.password,
        email: form.values.email,
        name: form.values.name,
      };
      const id = newNotification({
        title: capitalize(locale.notify.auth.signUp.loading),
        message: capitalize(locale.loading) + '...',
      });
      sendRequest<IRegUser, IUser>('auth/signup', 'POST', user).then(
        (res) => {
          if (!res.error) {
            successNotification({
              id,
              title: capitalize(locale.notify.auth.signUp.success),
              description: '',
              autoClose: 5000,
            });
            router.push(`/signin?referrer=${router.query.referrer}`);
          } else {
            errorNotification({
              id,
              title: capitalize(locale.notify.auth.signUp.error),
              description: '',
              autoClose: 5000,
            });
          }
        }
      );
    }
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
        <Stepper.Step label={capitalize(locale.auth.stepper.login)}>
          <TextInput
            required
            id="login"
            label={capitalize(locale.auth.labels.login)}
            placeholder={capitalize(locale.auth.placeholders.login)}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            {...form.getInputProps('login')}
          />
        </Stepper.Step>
        <Stepper.Step
          label={capitalize(locale.auth.stepper.password)}
        >
          <PasswordInput
            required
            id="password"
            label={capitalize(locale.auth.labels.password)}
            placeholder={capitalize(
              locale.auth.placeholders.password
            )}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            required
            id="confirmPassword"
            label={capitalize(locale.auth.labels.password)}
            placeholder={capitalize(
              locale.auth.placeholders.password
            )}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            {...form.getInputProps('confirmPassword')}
          />
        </Stepper.Step>
        <Stepper.Step label={capitalize(locale.auth.stepper.final)}>
          <TextInput
            required
            id="name"
            label={locale.auth.labels.name}
            placeholder={locale.auth.placeholders.name}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            {...form.getInputProps('name')}
          />
          <TextInput
            required
            id="email"
            label={capitalize(locale.auth.labels.email)}
            placeholder={capitalize(locale.auth.placeholders.email)}
            classNames={{
              label: styles.inputLabel,
            }}
            size="lg"
            {...form.getInputProps('email')}
          />
        </Stepper.Step>
      </Stepper>
      <Group position="center" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            {capitalize(locale.form.back)}
          </Button>
        )}
        <Button onClick={active !== 2 ? nextStep : handleSignUp}>
          {active !== 2
            ? capitalize(locale.form.next)
            : capitalize(locale.auth.footer.register)}
        </Button>
      </Group>
      <div className={styles.footer}>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>
            {capitalize(locale.auth.footer.hasAccount)}
          </span>
          <Link href={`/signin?referrer=${router.query.referrer}`}>
            <a className={styles.footerLink}>
              {capitalize(locale.auth.footer.login)}
            </a>
          </Link>
        </div>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>
            {capitalize(locale.auth.footer.returnTo)}
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
  return <LoginLayout title={'Регистрация'}>{page}</LoginLayout>;
};
export default SignUp;
