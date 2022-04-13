import { useLocale } from '@hooks/useLocale';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from '@mantine/hooks';
import { ITaskDisplay } from '@custom-types/ITask';
import { sendRequest } from '@requests/request';
import { useUser } from '@hooks/useUser';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { capitalize } from '@utils/capitalize';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import Form from '@components/AssignmentSchema/Form/Form';
import { ITag } from '@custom-types/ITag';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';

function EditAssignmentSchema() {
  const { locale } = useLocale();
  const { user } = useUser();
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
        if (res) {
          setAssignmentSchema(res);
        }
      });
    }
    sendRequest<{}, ITaskDisplay[]>(`tasks/list`, 'GET').then(
      (res) => {
        if (res) {
          const tasks = new Map<string, ITaskDisplay>();
          for (let i = 0; i < res.length; i++) {
            tasks.set(res[i].spec, res[i]);
          }
          setTasks(tasks);
        }
      }
    );
    setReadyTags(false);
    sendRequest<{}, ITag[]>(`assignment_tags/list`, 'GET').then(
      (res) => {
        if (res && !cleanUp) {
          setTags(res);
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
    validationRules: {},
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
    newNotification({
      id: 'editing-assignment',
      title: capitalize(locale.notify.assignmentSchema.edit.loading),
      message: capitalize(locale.loading) + '...',
    });
    sendRequest<IAssignmentSchema, IAssignmentSchema>(
      `assignments/schema/edit/${assignmentSchema.spec}`,
      'POST',
      body
    ).then((res) => {
      if (res) {
        successNotification({
          id: 'editing-assignment',
          title: capitalize(
            locale.notify.assignmentSchema.edit.success
          ),
          message: res.spec,
        });
      } else {
        errorNotification({
          id: 'editing-assignment',
          title: capitalize(
            locale.notify.assignmentSchema.edit.error
          ),
          message: capitalize(locale.error),
        });
      }
    });
  }, [form.values, locale, assignmentSchema?.spec]);

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
