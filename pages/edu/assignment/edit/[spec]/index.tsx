import { useLocale } from '@hooks/useLocale';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from '@mantine/form';
import { ITaskDisplay } from '@custom-types/ITask';
import { sendRequest } from '@requests/request';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import Form from '@components/AssignmentSchema/Form/Form';
import { ITag } from '@custom-types/ITag';
import { requestWithNotify } from '@utils/requestWithNotify';

function EditAssignmentSchema() {
  const { locale, lang } = useLocale();
  const [ready, setReady] = useState(false);

  const [tags, setTags] = useState<ITag[]>([]);
  const router = useRouter();

  const [readyTags, setReadyTags] = useState(false);

  const [assignmentSchema, setAssignmentSchema] =
    useState<IAssignmentSchema>(null!);
  const [tasks, setTasks] = useState<Map<string, ITaskDisplay>>(
    new Map()
  );

  useEffect(() => {
    let cleanUp = false;
    if (typeof router.query.spec === 'string') {
      sendRequest<{ spec: string }, IAssignmentSchema>(
        `assignments/schema/${router.query.spec}`,
        'GET'
      ).then((res) => {
        if (!res.error) {
          setAssignmentSchema(res.response);
        }
      });
    }
    sendRequest<{}, ITaskDisplay[]>(`tasks/list`, 'GET').then(
      (res) => {
        if (!res.error) {
          const tasks = new Map<string, ITaskDisplay>();
          for (let i = 0; i < res.response.length; i++) {
            tasks.set(res.response[i].spec, res.response[i]);
          }
          setTasks(tasks);
        }
      }
    );
    setReadyTags(false);
    sendRequest<{}, ITag[]>(`assignment_tags/list`, 'GET').then(
      (res) => {
        if (!res.error && !cleanUp) {
          setTags(res.response);
          setReadyTags(true);
        }
      }
    );
    return () => {
      cleanUp = true;
    };
  }, [router.query.spec]);

  const formValues = useMemo(
    () => ({
      ...assignmentSchema,
      tags: tags
        .filter((tag: ITag) =>
          assignmentSchema?.tags.includes(tag.spec)
        )
        .map((tag: ITag) => ({ label: tag.title, value: tag.spec })),
      tasks: assignmentSchema?.tasks
        .map((spec) => tasks.get(spec) || null!)
        .map((task: ITaskDisplay) => ({
          label: task?.title,
          value: task?.spec,
        })),
    }),
    [tasks, tags, assignmentSchema, readyTags] // eslint-disable-line
  );
  const form = useForm({
    initialValues: formValues,
  });

  useEffect(() => {
    form.setValues(formValues);
    if (assignmentSchema) {
      setReady(true);
    }
  }, [formValues]); // eslint-disable-line

  const handleSubmit = useCallback(() => {
    let body: any = {
      ...form.values,
      tasks: form.values['tasks'].map((task: Item) => task.value),
      tags: form.values['tags'].map((tag: Item) => tag.value),
    };
    requestWithNotify(
      `assignments/schema/edit/${assignmentSchema.spec}`,
      'POST',
      locale.notify.assignmentSchema.edit,
      lang,
      (response: IAssignmentSchema) => response.spec,
      body
    );
  }, [form.values, locale, assignmentSchema?.spec, lang]);

  return (
    <>
      {ready && readyTags && (
        <Form
          form={form}
          handleSubmit={handleSubmit}
          buttonLabel={capitalize(locale.form.update)}
        />
      )}
    </>
  );
}

EditAssignmentSchema.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default EditAssignmentSchema;
