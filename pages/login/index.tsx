import { useLocale } from '@hooks/useLocale';
import { Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { capitalize } from '@utils/capitalize';
import Image from 'next/image';
import { FC, memo, useCallback, useEffect } from 'react';
import logo from 'public/logo.svg';
import Head from 'next/head';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';

const Login: FC = () => {
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

  useEffect(() => {
    if (user) {
      router.push((router.query.referrer as string) || '/');
    }
  }, [user, router]);

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Center
        style={{
          width: '100%',
          height: '100vh',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        <Center style={{ flexDirection: 'column', gap: '10px' }}>
          <Image src={logo} width={128} height={128} alt="Logo image" />
          <div style={{ fontSize: '1.5em', lineHeight: '20px' }}>
            {capitalize(locale.accept)}
          </div>
        </Center>
        <form
          onSubmit={form.onSubmit((values) =>
            signIn(values.login, values.password)
          )}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <TextInput
            required
            id="login"
            label={capitalize(locale.auth.labels.login)}
            placeholder={capitalize(locale.auth.placeholders.login)}
            {...form.getInputProps('login')}
          />
          <PasswordInput
            required
            id="password"
            label={capitalize(locale.auth.labels.password)}
            placeholder={capitalize(locale.auth.placeholders.password)}
            {...form.getInputProps('password')}
          />
          <Button type="submit">{capitalize(locale.auth.submit)}</Button>
        </form>
      </Center>
    </div>
  );
};

export default memo(Login);
