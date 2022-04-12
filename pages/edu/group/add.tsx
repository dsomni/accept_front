import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/hooks';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useUser } from '@hooks/useUser';
import { sendRequest } from '@requests/request';
import Notify from '@ui/Notify/Notify';
import { ITask, ITaskDisplay } from '@custom-types/ITask';
import notificationStyles from '@styles/ui/notification.module.css';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IGroup, IGroupToCreate } from '@custom-types/IGroup';
import Form from '@components/Group/Form/Form';

const initialValues = {
  title: 'title',
  members: [],
};

function AddGroup() {
  const { locale } = useLocale();

  const defaultStatuses = useMemo(
    () => ({
      error: locale.groups.errors.create.error,
      ok: locale.groups.errors.create.success,
    }),
    [locale]
  );

  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(
    defaultStatuses.ok
  );
  const [notificationDescription, setNotificationDescription] =
    useState('');

  const form = useForm({
    initialValues,
    validationRules: {},
  });

  const handleSubmit = useCallback(() => {
    console.log(form.values);
    sendRequest<IGroupToCreate, IGroup>('groups/add', 'POST', {
      spec: '',
      title: form.values['title'],
      members: form.values['members'].map(
        (member: Item) => member.value
      ),
    }).then((res) => {
      setAnswer(true);
      if (res) {
        setNotificationStatus(defaultStatuses.ok);
        setNotificationDescription(res.spec);
        setError(false);
      } else {
        setNotificationStatus(defaultStatuses.error);
        setNotificationDescription('');
        setError(true);
      }
    });
  }, [form.values, defaultStatuses]);

  return (
    <>
      <div className={notificationStyles.notification}>
        <Notify
          answer={answer}
          error={error}
          setAnswer={setAnswer}
          status={notificationStatus}
          description={notificationDescription}
        />
      </div>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonText={capitalize(locale.create)}
      />
    </>
  );
}

AddGroup.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddGroup;
