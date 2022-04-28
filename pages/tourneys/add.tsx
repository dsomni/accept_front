import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/hooks';
import { ReactNode, useCallback } from 'react';
import { useUser } from '@hooks/useUser';
import { sendRequest } from '@requests/request';
import Form from '@components/Tournament/Form/Form';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';
import {
  ITournamentCreate,
  IAssessmentType,
} from '@custom-types/ITournament';

const initialValues: ITournamentCreate = {
  title: 'Турнир по простым числам',
  author: '',
  description: 'Хороший турнир, мне нравится',
  start: 0,
  end: 0,

  penalty: 0,

  admins: [],
  assessmentType: IAssessmentType.FOR_WHOLE,

  allowedLanguages: [],
  deniedLanguages: [],

  allowRegistrationAfterStart: true,

  freezeTable: undefined,
};

function AddTask() {
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const form = useForm({
    initialValues,
    validationRules: {},
  });

  const handleSubmit = useCallback(() => {
    console.log(form.values);
  }, [form.values]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={capitalize(locale.form.create)}
      />
    </>
  );
}

AddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTask;
