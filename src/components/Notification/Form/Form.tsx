import { FC, memo, useCallback } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useForm } from '@mantine/form';
import { requestWithNotify } from '@utils/requestWithNotify';
import { INewNotification, IRole } from '@custom-types/data/atomic';
import stepperStyles from '@styles/ui/stepper.module.css';
import { IGroup } from '@custom-types/data/IGroup';
import MainInfo from './MainInfo';
import DescriptionInfo from './DescriptionInfo';
import Users from './Users';
import GroupsRoles from './GroupsRoles';
import { IUser } from '@custom-types/data/IUser';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import Stepper from '@ui/Stepper/Stepper';

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
        buttonLabel={locale.create}
        form={form}
        handleSubmit={handleSubmit}
        stepFields={stepFields}
        pages={[
          <MainInfo key="1" form={form} />,
          <DescriptionInfo key="2" form={form} />,
          <Users key="3" form={form} users={users} />,
          <GroupsRoles
            key="4"
            form={form}
            groups={groups}
            roles={roles}
          />,
        ]}
        labels={locale.notification.form.steps.labels}
        descriptions={locale.notification.form.steps.descriptions}
      />
    </div>
  );
};

export default memo(Form);
