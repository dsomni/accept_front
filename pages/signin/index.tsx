import { LoginLayout } from '@layouts/LoginLayout';
import { FC, ReactElement, useCallback } from 'react';
import Head from 'next/head';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput } from '@mantine/core';
import Button from '@ui/Button/Button';
import styles from '@styles/auth/login.module.css';
import Link from 'next/link';
import {
  newNotification,
  successNotification,
  errorNotification,
} from '@utils/notificationFunctions';

function SignIn() {
  const { locale } = useLocale();
  const { signIn } = useUser();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      login: '',
      password: '',
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
    },
  });

  const handleSignIn = useCallback(
    (values: { login: string; password: string }) => {
      const id = newNotification({
        title: locale.notify.auth.signIn.loading,
        message: locale.loading + '...',
      });
      signIn(values.login, values.password).then((res) => {
        if (res) {
          successNotification({
            id,
            title: locale.notify.auth.signIn.success,
            autoClose: 5000,
          });
          router.push((router.query.referrer as string) || '/');
        } else {
          errorNotification({
            id,
            title: locale.notify.auth.signIn.error,
            autoClose: 5000,
          });
        }
      });
    },
    [locale, signIn, router]
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
          label={locale.auth.labels.login}
          placeholder={locale.auth.placeholders.login}
          classNames={{
            label: styles.inputLabel,
          }}
          size="lg"
          {...form.getInputProps('login')}
        />
        <PasswordInput
          required
          id="password"
          label={locale.auth.labels.password}
          placeholder={locale.auth.placeholders.password}
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
          {locale.auth.submit}
        </Button>
      </form>
      <div className={styles.footer}>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>
            {locale.auth.footer.noAccount}
          </span>
          <Link href={`/signup?referrer=${router.query.referrer}`}>
            <a className={styles.footerLink}>
              {locale.auth.footer.register}
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

SignIn.getLayout = (page: ReactElement) => {
  return <LoginLayout title={'Вход'}>{page}</LoginLayout>;
};
export default SignIn;
