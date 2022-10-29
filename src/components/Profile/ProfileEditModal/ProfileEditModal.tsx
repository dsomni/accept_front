import { IRole } from '@custom-types/data/atomic';
import { IUser } from '@custom-types/data/IUser';
import { useLocale } from '@hooks/useLocale';
import { useRequest } from '@hooks/useRequest';
import { useUser } from '@hooks/useUser';
import { useForm } from '@mantine/form';
import {
  Button,
  LoadingOverlay,
  Select,
  TextInput,
} from '@ui/basics';
import SimpleModal from '@ui/SimpleModal/SimpleModal';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { requestWithNotify } from '@utils/requestWithNotify';
import { FC, memo, useCallback, useState } from 'react';
import { Pencil } from 'tabler-icons-react';
import styles from './profileEditModal.module.css';

const ProfileEditModal: FC<{ user: IUser }> = ({ user }) => {
  const { locale, lang } = useLocale();
  const [opened, setOpened] = useState(false);
  const { accessLevel } = useUser();

  const form = useForm({
    initialValues: {
      login: user.login,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      role: user.role.spec.toString(),
    },
  });

  const close = useCallback(() => setOpened(false), []);
  const open = useCallback(() => setOpened(true), []);

  const filterRoles = useCallback(
    (data: IRole[]) =>
      data.filter((item) => item.accessLevel <= accessLevel),
    [accessLevel]
  );

  const { data, loading } = useRequest<{}, IRole[]>(
    'role',
    'GET',
    undefined,
    filterRoles
  );

  const handleSubmit = useCallback(() => {
    requestWithNotify(
      'profile/editAdmin',
      'PUT',
      locale.notify.profile.main,
      lang,
      () => '',
      form.values,
      () => location.reload()
    );
  }, [locale, lang, form.values]);

  return (
    <>
      <SingularSticky
        icon={<Pencil />}
        color={'var(--positive)'}
        onClick={open}
      />

      <SimpleModal opened={opened} close={close}>
        <div className={styles.wrapper}>
          <div className={styles.fields}>
            <TextInput
              label={locale.auth.labels.name}
              size="lg"
              {...form.getInputProps('name')}
            />
            <TextInput
              label={locale.auth.labels.surname}
              size="lg"
              {...form.getInputProps('surname')}
            />
            <TextInput
              label={locale.auth.labels.patronymic}
              size="lg"
              {...form.getInputProps('patronymic')}
            />
            <div style={{ position: 'relative' }}>
              <LoadingOverlay visible={loading} />
              <Select
                label={locale.users.list.role}
                data={
                  !data
                    ? []
                    : data.map((role) => ({
                        label: role.name,
                        value: role.spec.toString(),
                      }))
                }
                {...form.getInputProps('role')}
              />
            </div>
          </div>
          <Button onClick={handleSubmit}>{locale.edit}</Button>
        </div>
      </SimpleModal>
    </>
  );
};

export default memo(ProfileEditModal);
