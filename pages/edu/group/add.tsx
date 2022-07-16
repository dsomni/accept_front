import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { ReactNode, useCallback } from 'react';

import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IGroup } from '@custom-types/data/IGroup';
import Form from '@components/Group/Form/Form';
import { requestWithNotify } from '@utils/requestWithNotify';

const initialValues = {
  title: 'title',
  members: [],
};

function AddGroup() {
  const { locale, lang } = useLocale();

  const form = useForm({
    initialValues,
  });

  const handleSubmit = useCallback(() => {
    const body = {
      spec: '',
      title: form.values['title'],
      members: form.values['members'].map(
        (member: Item) => member.value
      ),
    };
    requestWithNotify(
      'tournament/add',
      'POST',
      locale.notify.group.create,
      lang,
      (response: IGroup) => response.spec,
      body
    );
  }, [form.values, locale, lang]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonText={locale.create}
      />
    </>
  );
}

AddGroup.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddGroup;
