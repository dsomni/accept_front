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

const LAST_STEP = 3;

const stepFields = [
  ['title', 'author'],
  ['shortDescription', 'description'],
  ['logins'],
  ['groups', 'roles'],
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
      author: '',
      title: 'new notification',
      shortDescription: '1123',
      description: '123123123123123213312312312',
      logins: [],
      groups: [],
      roles: [],
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
        return current < LAST_STEP + 1 ? current + 1 : current;
      }),
    []
  );
  const prevStep = useCallback(
    () =>
      setActive((current) => (current > 0 ? current - 1 : current)),
    []
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
        iconPosition="right"
        onStepClick={onStepperChange}
        breakpoint="sm"
        size="xl"
        classNames={{ content: stepperStyles.wrapper }}
      >
        <Stepper.Step
          label={locale.notification.form.steps.first}
          description={locale.notification.form.steps.mainInfo}
        >
          <MainInfo form={form} />
        </Stepper.Step>
        <Stepper.Step
          label={locale.notification.form.steps.second}
          description={locale.notification.form.steps.description}
        >
          <DescriptionInfo form={form} />
        </Stepper.Step>
        <Stepper.Step
          label={locale.notification.form.steps.third}
          description={locale.notification.form.steps.users}
        >
          <Users form={form} users={users} />
        </Stepper.Step>
        <Stepper.Step
          label={locale.notification.form.steps.forth}
          description={locale.notification.form.steps.groupsRoles}
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
        >
          {active !== LAST_STEP ? locale.form.next : locale.create}
        </Button>
      </Group>
    </>
  );
};

export default memo(Form);
