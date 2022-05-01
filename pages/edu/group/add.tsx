import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/hooks';
import { ReactNode, useCallback } from 'react';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IGroup } from '@custom-types/IGroup';
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
    validationRules: {},
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
        buttonText={capitalize(locale.create)}
      />
    </>
  );
}

AddGroup.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddGroup;
