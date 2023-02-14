import { FC, memo, useCallback, useState } from 'react';
import { useRequest } from '@hooks/useRequest';
import {
  Button,
  LoadingOverlay,
  Select,
  TextArea,
  TextInput,
} from '@ui/basics';
import { useForm } from '@mantine/form';
import styles from './executor.module.css';
import { requestWithError } from '@utils/requestWithError';
import {
  ExecutorBundle,
  IExecutor,
} from '@custom-types/data/IExecutor';
import { useLocale } from '@hooks/useLocale';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

const Executor: FC<{}> = ({}) => {
  const [response, setResponse] = useState('');

  const { locale, lang } = useLocale();

  const { data, loading } = useRequest<{}, ExecutorBundle>(
    'bundle/executor',
    'GET'
  );

  const form = useForm({
    initialValues: {
      collection: '',
      action: '',
      query: '{\n\t\n}',
      body: '[\n\t{\n\t\n\t}\n]',
      params: '{\n\t\n}',
      spec_field: '',
    },
    validate: {
      collection: (value) =>
        value == undefined
          ? locale.executor.form.validation.collection
          : null,
      action: (value) =>
        value == undefined
          ? locale.executor.form.validation.action
          : null,
      query: (value) =>
        value.length < 2
          ? locale.executor.form.validation.query
          : null,
      body: (value) =>
        value.length < 4
          ? locale.executor.form.validation.body.len
          : value[0] != '[' || value[value.length - 1] != ']'
          ? locale.executor.form.validation.body.array
          : null,
      params: (value) =>
        value.length < 2
          ? locale.executor.form.validation.params
          : null,
    },
    validateInputOnBlur: true,
  });

  const handleSend = useCallback(() => {
    if (!form.isValid()) {
      return;
    }
    let body: IExecutor;
    try {
      body = {
        collection: form.values.collection,
        action: form.values.action,
        query: JSON.parse(form.values.query),
        body: JSON.parse(form.values.body),
        params: JSON.parse(form.values.params),
      };
      if (form.values.spec_field.length != 0) {
        body['spec_field'] = form.values.spec_field;
      }
    } catch {
      const id = newNotification({});
      errorNotification({
        id,
        title: locale.executor.form.error.parse,
        autoClose: 5000,
      });
      return;
    }
    console.log(body);

    requestWithError<IExecutor, any>(
      'executor',
      'POST',
      locale.notify.executor.send,
      lang,
      body,
      (response) => {
        setResponse(JSON.stringify(response, null, 4));
      }
    );
  }, [form, locale, lang]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <LoadingOverlay visible={loading} />
        <Select
          data={data?.collections || []}
          label={locale.executor.form.collection}
          {...form.getInputProps('collection')}
        />
        <Select
          data={data?.actions || []}
          label={locale.executor.form.action}
          {...form.getInputProps('action')}
        />
        <TextArea
          maxRows={15}
          minRows={5}
          label={locale.executor.form.query}
          {...form.getInputProps('query')}
        />
        <TextArea
          maxRows={15}
          minRows={5}
          label={locale.executor.form.body}
          {...form.getInputProps('body')}
        />
        <TextArea
          minRows={5}
          maxRows={15}
          label={locale.executor.form.params}
          {...form.getInputProps('params')}
        />
        <TextInput
          helperContent={locale.executor.form.helper.spec_field}
          label={locale.executor.form.spec_field}
          {...form.getInputProps('spec_field')}
        />
        <Button disabled={!form.isValid()} onClick={handleSend}>
          {locale.send}
        </Button>
      </div>
      {response.length > 0 && (
        <div className={styles.responseWrapper}>
          <TextArea
            label={locale.executor.response}
            minRows={15}
            maxRows={30}
            autosize
            value={response}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default memo(Executor);
