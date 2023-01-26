import {
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { LoginLayout } from '@layouts/LoginLayout';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput } from '@ui/basics';
import styles from '@styles/auth/login.module.css';
import Link from 'next/link';
import {
  errorNotification,
  newNotification,
  successNotification,
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
        value.length == 0 ? locale.auth.errors.login.exists : null,
      password: (value) =>
        value.length == 0 ? locale.auth.errors.password.exists : null,
    },
    validateInputOnBlur: true,
  });

  const [loading, setLoading] = useState(false);
  const [toSignIn, setToSignIn] = useState(false);

  const handleSignIn = useCallback(
    (values: { login: string; password: string }) => {
      if (form.validate().hasErrors) return;
      const id = newNotification({
        title: locale.notify.auth.signIn.loading,
        message: locale.loading + '...',
      });
      setLoading(true);
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
        setLoading(false);
      });
    },
    [form, locale, signIn, router]
  );

  useEffect(() => {
    if (!toSignIn) return;
    handleSignIn(form.values);
    setToSignIn(false);
  }, [toSignIn, handleSignIn, form.values]);

  const processKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setToSignIn(true);
    }
  }, []);

  useEffect(() => {
    if (!window) return;
    window.addEventListener('keydown', processKeydown);
    return () => {
      window.removeEventListener('keydown', processKeydown);
    };
  }, [processKeydown]);

  return (
    <>
      <form className={styles.formWrapper}>
        <TextInput
          required
          id="login"
          label={locale.auth.labels.login}
          placeholder={locale.auth.placeholders.login}
          classNames={{
            label: styles.label,
          }}
          size="lg"
          {...form.getInputProps('login')}
        />
        <PasswordInput
          required
          label={locale.auth.labels.password}
          id="password"
          placeholder={locale.auth.placeholders.password}
          classNames={{
            label: styles.label,
          }}
          size="lg"
          {...form.getInputProps('password')}
        />
        <Button
          type="button"
          onClick={(_) => handleSignIn(form.values)}
          disabled={Object.keys(form.errors).length > 0 || loading}
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
          <Link
            href={`/signup?referrer=${router.query.referrer}`}
            className={styles.footerLink}
          >
            {locale.auth.footer.register}
          </Link>
        </div>
        <div className={styles.footerLine}>
          <span className={styles.footerText}>
            {locale.auth.footer.returnTo}
          </span>
          <Link href="/" className={styles.footerLink}>
            {locale.auth.footer.mainPage}
          </Link>
        </div>
      </div>
    </>
  );
}

SignIn.getLayout = (page: ReactElement) => {
  return <LoginLayout title={'login'}>{page}</LoginLayout>;
};
export default SignIn;
