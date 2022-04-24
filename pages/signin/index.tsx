import CustomEditor from '@ui/CustomEditor/CustomEditor';
import { LoginLayout } from '@layouts/LoginLayout';
import {
  FC,
  ReactElement,
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
import { Button, PasswordInput, TextInput } from '@mantine/core';
import styles from '@styles/auth/login.module.css';
import Link from 'next/link';
import {
  newNotification,
  successNotification,
  errorNotification,
} from '@utils/notificationFunctions';

function SignIn() {
  const { locale } = useLocale();
  const { user, signIn } = useUser();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validationRules: {
      login: (value) => value.trim().length > 4,
      password: (value) => value.trim().length > 4,
    },
    errorMessages: {
      login: capitalize(locale.auth.errors.login),
      password: capitalize(locale.auth.errors.password),
    },
  });

  const handleSignIn = useCallback(
    (values) => {
      const id = newNotification({
        title: capitalize(locale.notify.auth.signIn.loading),
        message: capitalize(locale.loading) + '...',
      });
      signIn(values.login, values.password).then((res) => {
        if (res) {
          successNotification({
            id,
            title: capitalize(locale.notify.auth.signIn.success),
            description: '',
            autoClose: 5000,
          });
          router.push((router.query.referrer as string) || '/');
        } else {
          errorNotification({
            id,
            title: capitalize(locale.notify.auth.signIn.error),
            description: '',
            autoClose: 5000,
          });
        }
      });
    },
    [locale, signIn, user, router]
  );

  return (
    <>
      <Head>
        <title>Sign In | Accept</title>
      </Head>
      <form className={styles.formWrapper}>
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
        <PasswordInput
          required
          id="password"
          label={capitalize(locale.auth.labels.password)}
          placeholder={capitalize(locale.auth.placeholders.password)}
          classNames={{
            label: styles.inputLabel,
          }}
          size="lg"
          {...form.getInputProps('password')}
        />
        <Button
          type="button"
          onClick={form.onSubmit((values) => handleSignIn(values))}
          className={styles.enterButton}
        >
          {capitalize(locale.auth.submit)}
        </Button>
      </form>
      <div className={styles.footer}>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>
            {capitalize(locale.auth.footer.noAccount)}
          </span>
          <Link href="/sign_up">
            <a className={styles.footerLink}>
              {capitalize(locale.auth.footer.register)}
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

SignIn.getLayout = (page: ReactElement) => {
  return <LoginLayout title={'Вход'}>{page}</LoginLayout>;
};
export default SignIn;
