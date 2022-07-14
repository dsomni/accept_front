import Form from '@components/Task/Form/Form';
import { useLocale } from '@hooks/useLocale';
import { ReactNode, useCallback } from 'react';
import { useForm } from '@mantine/form';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { capitalize } from '@utils/capitalize';
import { GetStaticPaths, GetStaticProps } from 'next';
import { requestWithNotify } from '@utils/requestWithNotify';

const initialValues = (login: string) => ({
  spec: '',
  title: 'Простые числа',
  author: login,
  tags: [],
  verdict: undefined,
  lastUpdate: 0,
  lastRender: 0,
  description:
    'Написать программу выводящую все простые числа меньше n.',
  inputFormat: 'Вводится натуральное число n<10000. ',
  outputFormat:
    'Выведите все простые числа меньшие n в одну строку через пробел. Если простых нет выведите "NO".',
  grade: 11,
  hasHint: false,
  hintContent: '',
  hintAlarmType: 'attempts',
  hintAlarm: 0,
  remark: '',
  examples: [
    { inputData: '1', outputData: 'NO' },
    { inputData: '15', outputData: '2 3 5 7 11 13' },
  ],
  tests: [
    { inputData: '1', outputData: '1' },
    { inputData: '1', outputData: '1' },
    { inputData: '1', outputData: '1' },
    { inputData: '1', outputData: '1' },
    { inputData: '1', outputData: '1' },
    { inputData: '1', outputData: '1' },
    { inputData: '1', outputData: '1' },
    { inputData: '1', outputData: '1' },
    { inputData: '1', outputData: '1' },
  ],
  checkerCode: '',
  checkerLang: 'py',
  checkType: 'tests', //"tests" or "checker"
  type: 'code', //"code" or "text"
  isTournament: true,
});

function AddTournamentTask(props: { tournament_spec: string }) {
  const { locale, lang } = useLocale();
  const { user } = useUser();
  const tournament_spec = props.tournament_spec;
  const router = useRouter();

  const form = useForm({
    initialValues: initialValues(user?.login || ''),
  });

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      lastUpdate: new Date().getTime(),
    };
    if (form.values['checkType'] === 'checker') {
      body.checker = {
        sourceCode: form.values['checkerCode'],
        language: form.values['checkerLang'],
        version: 0,
      };
    }
    if (
      form.values['remark'] &&
      form.values['remark'].trim() === ''
    ) {
      body.remark = undefined;
    }
    requestWithNotify(
      `tasks/add`,
      'POST',
      locale.notify.task.create,
      lang,
      (res: any) => res.spec,
      body,
      (response: any) => {
        requestWithNotify(
          `tournaments/add_task`,
          'POST',
          locale.notify.tournament_task.create,
          lang,
          (_: any) => response.spec,
          {
            task_spec: response.spec,
            tournament_spec,
          }
        );
      }
    );
  }, [form.values, locale, tournament_spec, lang]);
  return (
    <div>
      (
      <Form
        form={form}
        handleSubmit={handleSubmit}
        buttonLabel={capitalize(locale.form.create)}
      />
      )
    </div>
  );
}

AddTournamentTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTournamentTask;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.tournament_spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      tournament_spec: params.tournament_spec,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
