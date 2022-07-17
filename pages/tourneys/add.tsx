import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { ReactNode, useCallback } from 'react';
import { useUser } from '@hooks/useUser';
import Form from '@components/Tournament/Form/Form';

import { requestWithNotify } from '@utils/requestWithNotify';
import {
  ITournamentCreate,
  IAssessmentType,
  ITournament,
} from '@custom-types/data/ITournament';

const initialValues = (author: string): ITournamentCreate => ({
  title: 'Турнир по простым числам',
  author: author,
  description: 'Хороший турнир, мне нравится',
  start: Date.now(),
  end: Date.now(),

  penalty: 0,

  admins: [],
  assessmentType: IAssessmentType.FOR_WHOLE,

  allowedLanguages: [],
  deniedLanguages: [],

  allowRegistrationAfterStart: true,

  freezeTable: undefined,
});

function AddTask() {
  const { locale, lang } = useLocale();
  const { user } = useUser();

  const form = useForm({
    initialValues: initialValues(user?.login || ''),
  });

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      assessmentType: parseInt(form.values.assessmentType),
    };
    requestWithNotify(
      'tournaments/add',
      'POST',
      locale.notify.tournament.create,
      lang,
      (response: ITournament) => response.spec,
      body
    );
  }, [form.values, locale, lang]);

  return (
    <>
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={locale.form.create}
      />
    </>
  );
}

AddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTask;
