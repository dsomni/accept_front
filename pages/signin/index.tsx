import { LoginLayout } from '@layouts/LoginLayout';
import { ReactElement, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import Button from '@ui/Button/Button';
import styles from '@styles/auth/login.module.css';
import Link from 'next/link';
import {
  newNotification,
  successNotification,
  errorNotification,
} from '@utils/notificationFunctions';
import TextInput from '@ui/TextInput/TextInput';
import PasswordInput from '@ui/PasswordInput/PasswordInput';

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
  });

  const [loading, setLoading] = useState(false);

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
          onBlur={() => form.validateField('login')}
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
          onBlur={() => form.validateField('password')}
          {...form.getInputProps('password')}
        />
        <Button
          type="button"
          onClick={form.onSubmit((values) => handleSignIn(values))}
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
  return <LoginLayout title={'login'}>{page}</LoginLayout>;
};
export default SignIn;
