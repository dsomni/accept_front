import { useLocale } from '@hooks/useLocale';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useUser } from '@hooks/useUser';
import { ITaskDisplay } from '@custom-types/data/ITask';
import Form from '@components/Task/Form/Form';
import { requestWithNotify } from '@utils/requestWithNotify';
import { useRequest } from '@hooks/useRequest';
import { ITaskAddBundle } from '@custom-types/data/bundle';

import {
  ITaskCheckType,
  ITaskType,
  IHintAlarmType,
  ITest,
} from '@custom-types/data/atomic';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

const initialValues = {
  spec: '',
  title: '',
  tags: [],
  author: '',
  complexity: 15,
  description: '',
  constraintsTime: 1,
  constraintsMemory: 16,
  examples: [{ inputData: '', outputData: '' }],
  inputFormat: '',
  outputFormat: '',
  remark: '',

  hasHint: true,
  hintContent: '',
  hintAlarmType: '0',
  hintAlarm: 0,

  allowedLanguages: [],
  forbiddenLanguages: [],

  tests: [],

  checkerLang: '0',
  checkerCode: '',

  checkType: '0', //"tests" or "checker"
  taskType: '0', //"code" or "text"
  shouldRestrictLanguages: false,
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
        value.length < 5 ? locale.task.form.validation.title : null,
      tags: (value) =>
        value.length == 1 ? locale.task.form.validation.tags : null,
      description: (value) =>
        value.length < 20
          ? locale.task.form.validation.description
          : null,
      inputFormat: (value) =>
        value.length == 0
          ? locale.task.form.validation.inputFormat
          : null,
      outputFormat: (value) =>
        value.length == 0
          ? locale.task.form.validation.outputFormat
          : null,
      constraintsMemory: (value) =>
        value < 0 || value > 1024
          ? locale.task.form.validation.constraints.memory
          : null,
      constraintsTime: (value) =>
        value < 0.5 || value > 30
          ? locale.task.form.validation.constraints.time
          : null,
      complexity: (value) =>
        value < 0
          ? locale.task.form.validation.complexity.least
          : value > 100
          ? locale.task.form.validation.complexity.most
          : null,
      examples: (value, values) =>
        value.length < 1
          ? locale.task.form.validation.examples.number
          : value.filter(
              (pair: ITest) =>
                pair.inputData.trim() || pair.outputData.trim()
            ).length != value.length
          ? locale.task.form.validation.examples.empty
          : null,
      tests: (value, values) =>
        value.length < 1
          ? locale.task.form.validation.tests.number
          : value.filter(
              (pair: ITest) =>
                (pair.inputData.trim() && values.taskType == '0') ||
                (pair.outputData.trim() && values.taskType == '0')
            ).length != value.length
          ? locale.task.form.validation.tests.empty
          : null,
      checkerCode: (value, values) =>
        values.checkType == '1' && value.length == 0
          ? locale.task.form.validation.checkerCode
          : null,
      hintContent: (value, values) =>
        values.hasHint
          ? value.length == 0
            ? locale.task.form.validation.hintContent
            : null
          : null,
      hintAlarm: (value, values) =>
        values.hasHint
          ? value < 0
            ? locale.task.form.validation.hintAlarm
            : null
          : null,
    },
  });

  const { data, loading } = useRequest<{}, ITaskAddBundle>(
    'bundle/task_add'
  );

  useEffect(() => {
    if (data) {
      setTaskTypes(data.task_types);
      setTaskCheckTypes(data.task_check_types);
      setHintAlarmTypes(data.hint_alarm_types);
    }
  }, [data]);

  const handleSubmit = useCallback(() => {
    if (form.validate().hasErrors) {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.validationError,
        autoClose: 5000,
      });
      return;
    }
    const {
      checkerCode,
      checkerLang,
      hintContent,
      hintAlarmType,
      hintAlarm,
      constraintsMemory,
      constraintsTime,
      allowedLanguages,
      forbiddenLanguages,
      tags,
      ...values
    } = form.values;
    let body: any = {
      ...values,
      author: user?.shortName || 'unknown',
      checkType: +form.values['checkType'],
      taskType: +form.values['taskType'],
      constraints: {
        time: constraintsTime,
        memory: constraintsMemory,
      },
      allowedLanguages: allowedLanguages.map(
        (lang: Item) => lang.value
      ),
      forbiddenLanguages: forbiddenLanguages.map(
        (lang: Item) => lang.value
      ),
      tags: tags.map((tag: Item) => tag.value),
    };
    if (!form.values.shouldRestrictLanguages) {
      body.allowedLanguages = [];
      body.forbiddenLanguages = [];
    }
    if (form.values['checkType'] === '1') {
      body.checker = {
        sourceCode: checkerCode,
        language: +checkerLang,
      };
    }
    if (form.values['remark'].trim() === '') {
      body.remark = undefined;
    }
    if (form.values['hasHint']) {
      body.hint = {
        content: hintContent,
        alarmType: +hintAlarmType,
        alarm: hintAlarm,
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
  }, [form, user?.shortName, locale, lang]);

  return (
    <>
      {!loading && (
        <Form
          form={form}
          taskTypes={taskTypes}
          taskCheckTypes={taskCheckTypes}
          hintAlarmTypes={hintAlarmTypes}
          handleSubmit={handleSubmit}
          buttonLabel={locale.form.create}
        />
      )}
    </>
  );
}

AddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AddTask;
