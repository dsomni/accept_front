import {
  FC,
  memo,
  ReactElement,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { LoginLayout } from '@layouts/LoginLayout';
import { useLocale } from '@hooks/useLocale';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import { Stepper, Group } from '@mantine/core';
import {
  newNotification,
  errorNotification,
} from '@utils/notificationFunctions';
import { requestWithNotify } from '@utils/requestWithNotify';
import { sendRequest } from '@requests/request';
import TextInput from '@ui/TextInput/TextInput';
import Button from '@ui/Button/Button';
import PasswordInput from '@ui/PasswordInput/PasswordInput';
import { INewNotification } from '@custom-types/data/atomic';
import CustomEditor from '@ui/CustomEditor/CustomEditor';
import stepperStyles from '@styles/ui/stepper.module.css';
import InputWrapper from '@ui/InputWrapper/InputWrapper';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';

const AddNotification: FC<{}> = ({}) => {
  const { locale, lang } = useLocale();
  const router = useRouter();

  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      spec: '',
      author: '',
      title: '',
      shortDescription: '',
      description: '',
      logins: [],
      groups: ['aec2953e-293e-46f0-9fce-caf34a169dcb'],
    },
  });

  const nextStep = useCallback(
    () =>
      setActive((current) => {
        return current < 3 ? current + 1 : current;
      }),
    []
  );
  const prevStep = useCallback(
    () =>
      setActive((current) => (current > 0 ? current - 1 : current)),
    []
  );

  const handleSubmit = useCallback(() => {
    requestWithNotify<INewNotification, boolean>(
      'notification/add',
      'POST',
      locale.notify.notification.create,
      lang,
      (response: boolean) => '',
      form.values as INewNotification
    );
  }, [form, locale, lang]);

  return (
    <>
      <Stepper
        className={stepperStyles.stepper}
        active={active}
        breakpoint="sm"
        size="xl"
      >
        <Stepper.Step
          label={locale.notification.form.steps.first}
          description={locale.notification.form.steps.mainInfo}
        >
          <TextInput
            label={locale.notification.form.title}
            required
            onBlur={() => {
              form.validateField('title');
            }}
            {...form.getInputProps('title')}
          />
          <TextInput
            label={locale.notification.form.author}
            onBlur={() => {
              form.validateField('author');
            }}
            {...form.getInputProps('author')}
          />
        </Stepper.Step>
        <Stepper.Step
          label={locale.notification.form.steps.second}
          description={locale.notification.form.steps.description}
        >
          <TextInput
            label={locale.notification.form.shortDescription}
            onBlur={() => {
              form.validateField('shortDescription');
            }}
            {...form.getInputProps('shortDescription')}
          />
          <CustomEditor
            classNames={{
              label: stepperStyles.label,
            }}
            label={locale.notification.form.description}
            form={form}
            name={'description'}
          />
        </Stepper.Step>
        <Stepper.Step
          label={locale.notification.form.steps.third}
          description={locale.notification.form.steps.users}
        >
          SelectUsers and groups
        </Stepper.Step>
      </Stepper>
      <Group position="center">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            {locale.form.back}
          </Button>
        )}
        <Button onClick={active !== 2 ? nextStep : handleSubmit}>
          {active !== 2 ? locale.form.next : locale.create}
        </Button>
      </Group>
    </>
  );
};

export default memo(AddNotification);
