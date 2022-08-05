import Form from '@components/Task/Form/Form';
import { useLocale } from '@hooks/useLocale';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useForm } from '@mantine/form';
import { ITaskDisplay, ITaskEdit } from '@custom-types/data/ITask';

import { useUser } from '@hooks/useUser';

import { DefaultLayout } from '@layouts/DefaultLayout';

import { getApiUrl } from '@utils/getServerUrl';
import { GetStaticPaths, GetStaticProps } from 'next';
import { requestWithNotify } from '@utils/requestWithNotify';
import { ITaskEditBundle } from '@custom-types/data/bundle';
import {
  IHintAlarmType,
  ITaskCheckType,
  ITaskType,
  ITest,
} from '@custom-types/data/atomic';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

function EditTask(props: {
  task: ITaskEdit;
  taskTypes: ITaskType[];
  taskCheckTypes: ITaskCheckType[];
  hintAlarmTypes: IHintAlarmType[];
}) {
  const { locale, lang } = useLocale();
  const { user } = useUser();
  const { task, taskTypes, taskCheckTypes, hintAlarmTypes } = props;
  const formValues = useMemo(
    () => ({
      ...task,
      author: task.author,

      checkType: task.checkType?.spec.toString() || '0',
      checkerCode: task.checker?.sourceCode || '',
      checkerLang: task.checker?.language.toString() || '0',

      hasHint: task.hint ? true : false,
      hintContent: task.hint?.content || '',
      hintAlarmType: task.hint?.alarmType.spec.toString() || '0',
      hintAlarm: task.hint?.alarm || 0,
      shouldRestrictLanguages:
        task.allowedLanguages.length > 0 ||
        task.allowedLanguages.length > 0,

      taskType: task.taskType.spec.toString(),

      tags: task.tags.map((tag) => ({
        value: tag.spec,
        label: tag.title,
      })),

      constraintsTime: task.constraints.time,
      constraintsMemory: task.constraints.memory,
      allowedLanguages: task.allowedLanguages.map((lang) => ({
        value: lang.spec.toString(),
        name: lang.name,
      })),
      forbiddenLanguages: task.forbiddenLanguages.map((lang) => ({
        value: lang.spec.toString(),
        name: lang.name,
      })),

      remark: task.remark || '',
    }),
    [task] //eslint-disable-line
  );
  const form = useForm({
    initialValues: formValues,
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
      author: user?.login || 'unknown',
      checkType: +form.values['checkType'],
      taskType: +form.values['taskType'],
      constraints: {
        time: constraintsTime,
        memory: constraintsMemory,
      },
      allowedLanguages: allowedLanguages.map((lang) => lang.value),
      forbiddenLanguages: forbiddenLanguages.map(
        (lang) => lang.value
      ),
      tags: tags.map((tag) => tag.value),
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
      `task/edit/`,
      'POST',
      locale.notify.task.edit,
      lang,
      (response: ITaskDisplay) => response.spec,
      body
    );
  }, [form, user?.login, locale, lang]);
  return (
    <Form
      form={form}
      handleSubmit={handleSubmit}
      buttonLabel={locale.form.update}
      taskTypes={taskTypes}
      taskCheckTypes={taskCheckTypes}
      hintAlarmTypes={hintAlarmTypes}
    />
  );
}

EditTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditTask;

const API_URL = getApiUrl();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const taskBundleResponse = await fetch(
    `${API_URL}/api/bundle/task-edit/${params.spec}`
  );
  if (taskBundleResponse.status === 200) {
    const taskBundle: ITaskEditBundle =
      await taskBundleResponse.json();
    return {
      props: {
        task: taskBundle.task,
        taskCheckTypes: taskBundle.task_check_types,
        taskTypes: taskBundle.task_types,
        hintAlarmTypes: taskBundle.hint_alarm_types,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/Not-Found',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
