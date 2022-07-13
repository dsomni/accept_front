import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useUser } from '@hooks/useUser';
import { ITaskDisplay } from '@custom-types/data/ITask';
import Form from '@components/Task/Form/Form';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { requestWithNotify } from '@utils/requestWithNotify';
import { useRequest } from '@hooks/useRequest';
import { ITaskAddBundle } from '@custom-types/data/bundle';

import {
  ITaskCheckType,
  ITaskType,
  IHintAlarmType,
} from '@custom-types/data/atomic';

const initialValues = {
  spec: '',
  title: 'Простые числа',
  author: '',
  tags: [],
  description:
    'Написать программу выводящую все простые числа меньше n.',
  inputFormat: 'Вводится натуральное число n<10000. ',
  outputFormat:
    'Выведите все простые числа меньшие n в одну строку через пробел. Если простых нет выведите "NO".',
  grade: 11,
  hasHint: false,
  hintContent: '',
  hintAlarmType: '0',
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
  allowedLanguages: [],
  forbiddenLanguages: [],
  checkerLang: 'py',
  checkType: '0', //"tests" or "checker"
  type: '0', //"code" or "text"
};

function AddTask() {
  const { locale, lang } = useLocale();
  const { user } = useUser();
  const [taskTypes, setTaskTypes] = useState<ITaskType[]>([]);
  const [taskCheckTypes, setTaskCheckTypes] = useState<
    ITaskCheckType[]
  >([]);
  const [hintAlarmTypes, setHintAlarmTypes] = useState<
    IHintAlarmType[]
  >([]);

  const form = useForm({
    initialValues,
    validate: {
      title: (value) =>
        value.length < 5 ? locale.tasks.form.validation.title : null,
      tags: (value) =>
        value.length == 1 ? locale.tasks.form.validation.tags : null,
      description: (value) =>
        value.length < 20
          ? locale.tasks.form.validation.description
          : null,
      inputFormat: (value) =>
        value.length == 0
          ? locale.tasks.form.validation.inputFormat
          : null,
      outputFormat: (value) =>
        value.length == 0
          ? locale.tasks.form.validation.outputFormat
          : null,
      grade: (value) =>
        value < 0
          ? locale.tasks.form.validation.grade.least
          : value > 11
          ? locale.tasks.form.validation.grade.most
          : null, //value < 1 && value > 11 ? 'Grade must be between at least one and at most eleven' : null,
      examples: (value) =>
        value.length < 2
          ? locale.tasks.form.validation.examples
          : null,
      tests: (value, values) =>
        values.type == '1' || value.length < 5
          ? locale.tasks.form.validation.tests
          : null,
      hintContent: (value, values) =>
        !values.hasHint || value.length == 0
          ? locale.tasks.form.validation.hintContent
          : null,
      checkerCode: (value, values) =>
        values.type == '0' || value.length == 0
          ? locale.tasks.form.validation.checkerCode
          : null,
    },
  });

  const { data, loading, error, detail } = useRequest<
    {},
    ITaskAddBundle
  >('bundle/task_add');

  useEffect(() => {
    if (data) {
      setTaskTypes(data.task_types);
      setTaskCheckTypes(data.task_check_types);
      setHintAlarmTypes(data.hint_alarm_types);
    }
  }, [data]);

  const handleSubmit = useCallback(() => {
    const {
      checkerCode,
      checkerLang,
      hintContent,
      hintAlarmType,
      hintAlarm,
      ...values
    } = form.values;
    let body: any = {
      ...values,
      tags: form.values['tags'].map((tag: Item) => tag.value),
      author: user?.login || 'popa',
      checkType: Number(form.values['checkType']),
      taskType: Number(form.values['type']),
    };
    if (form.values['checkType'] === '1') {
      body.checker = {
        sourceCode: form.values['checkerCode'],
        language: form.values['checkerLang'],
      };
    }
    if (form.values['remark'].trim() === '') {
      body.remark = undefined;
    }
    if (form.values['hasHint']) {
      body.hint = {
        content: form.values['hintContent'],
        alarmType: Number(form.values['hintAlarmType']),
        alarm: form.values['hintAlarm'],
      };
    }
    requestWithNotify(
      'task/add',
      'POST',
      locale.notify.task.create,
      lang,
      (response: ITaskDisplay) => response.spec,
      body
    );
  }, [form.values, locale, user?.login, lang]);

  return (
    <>
      {!loading && (
        <Form
          form={form}
          taskTypes={taskTypes}
          taskCheckTypes={taskCheckTypes}
          hintAlarmTypes={hintAlarmTypes}
          handleSubmit={handleSubmit}
          buttonLabel={capitalize(locale.form.create)}
        />
      )}
    </>
  );
}

AddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTask;
