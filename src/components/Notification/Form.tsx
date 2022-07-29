import { FC, memo, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useForm } from '@mantine/form';
import { Stepper, Group } from '@mantine/core';
import { requestWithNotify } from '@utils/requestWithNotify';
import { Button } from '@ui/basics';
import { INewNotification, IRole } from '@custom-types/data/atomic';
import stepperStyles from '@styles/ui/stepper.module.css';
import { IGroup } from '@custom-types/data/IGroup';
import MainInfo from './MainInfo';
import DescriptionInfo from './DescriptionInfo';
import Users from './Users';
import GroupsRoles from './GroupsRoles';
import { IUser } from '@custom-types/data/IUser';
import { AlertCircle } from 'tabler-icons-react';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

const LAST_STEP = 3;

const stepFields = [
  ['title', 'author'],
  ['shortDescription', 'description'],
  [],
  ['logins', 'groups', 'roles'],
];

const Form: FC<{
  users: IUser[];
  groups: IGroup[];
  roles: IRole[];
}> = ({ users, groups, roles }) => {
  const { locale, lang } = useLocale();

  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      spec: '',
      title: 'Новый урок',
      author: 'Я',

      shortDescription: 'Урок по циклам',
      description:
        'Новый урок по циклам содержащий задачи 1, 2, 5, 19',

      logins: [],

      groups: [],
      roles: [],
    },
    validate: {
      title: (value) =>
        value.length < 5
          ? locale.notification.form.validate.title
          : null,
      author: () => null,

      shortDescription: () => null,
      description: (value) =>
        value.length < 20
          ? locale.notification.form.validate.description
          : null,

      logins: (value, values) =>
        !(values.logins.length > 0) &&
        !(values.groups.length > 0) &&
        !(values.roles.length > 0)
          ? locale.notification.form.validate.users
          : null,
      groups: (value, values) =>
        !(values.logins.length > 0) &&
        !(values.groups.length > 0) &&
        !(values.roles.length > 0)
          ? locale.notification.form.validate.users
          : null,
      roles: (value, values) =>
        !(values.logins.length > 0) &&
        !(values.groups.length > 0) &&
        !(values.roles.length > 0)
          ? locale.notification.form.validate.users
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
          return current < LAST_STEP ? current + 1 : current;
        }
        return current < LAST_STEP + 1 ? current + 1 : current;
      }),
    []
  );
  const prevStep = useCallback(
    () =>
      setActive((current) => (current > 0 ? current - 1 : current)),
    []
  );

  const getErrorsStep = useCallback(
    (step: number) => {
      let error = false;
      stepFields[step].forEach((field: string) => {
        if (form.errors[field] !== undefined) {
          error = true;
          return;
        }
      });
      return error;
    },
    [form.errors]
  );

  const onStepperChange = useCallback(
    (newStep: number) => {
      if (newStep < active || !validateStep(active)) {
        setActive(newStep);
      }
    },
    [active, validateStep]
  );

  const handleSubmit = useCallback(() => {
    console.log(form.values);
    if (form.validate().hasErrors) {
      const id = newNotification({});
      errorNotification({
        id,
        title: 'validation',
        autoClose: 5000,
      });
      return;
    }
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
    <div className={stepperStyles.stepper}>
      <Stepper
        active={active}
        iconPosition="right"
        onStepClick={onStepperChange}
        breakpoint="sm"
        size="xl"
        classNames={{ content: stepperStyles.wrapper }}
      >
        <Stepper.Step
          label={locale.notification.form.steps.first}
          description={locale.notification.form.steps.mainInfo}
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
          <MainInfo form={form} />
        </Stepper.Step>
        <Stepper.Step
          label={locale.notification.form.steps.second}
          description={locale.notification.form.steps.description}
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
          <DescriptionInfo form={form} />
        </Stepper.Step>
        <Stepper.Step
          label={locale.notification.form.steps.third}
          description={locale.notification.form.steps.users}
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
          <Users form={form} users={users} />
        </Stepper.Step>
        <Stepper.Step
          label={locale.notification.form.steps.forth}
          description={locale.notification.form.steps.groupsRoles}
          icon={
            getErrorsStep(3) ? (
              <AlertCircle color={'var(--negative)'} />
            ) : undefined
          }
          completedIcon={
            getErrorsStep(3) ? (
              <AlertCircle color={'white'} />
            ) : undefined
          }
          color={getErrorsStep(3) ? 'red' : undefined}
        >
          <GroupsRoles form={form} groups={groups} roles={roles} />
        </Stepper.Step>
      </Stepper>
      <Group position="center">
        {active !== 0 && (
          <Button variant="light" onClick={prevStep}>
            {locale.form.back}
          </Button>
        )}
        <Button
          onClick={active !== LAST_STEP ? nextStep : handleSubmit}
          disabled={active !== LAST_STEP && getErrorsStep(active)}
          type="button"
        >
          {active !== LAST_STEP ? locale.form.next : locale.create}
        </Button>
      </Group>
    </div>
  );
};

export default memo(Form);
