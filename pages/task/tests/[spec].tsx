import { ReactNode, useCallback, useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import {
  ITaskCheckType,
  ITaskType,
  ITest,
} from '@custom-types/data/atomic';
import { useForm } from '@mantine/form';
import { sendRequest } from '@requests/request';
import stepperStyles from '@styles/ui/stepper.module.css';
import { useLocale } from '@hooks/useLocale';
import ListItem from '@ui/ListItem/ListItem';
import Title from '@ui/Title/Title';
import SingularSticky from '@ui/Sticky/SingularSticky';
import { Download } from 'tabler-icons-react';
import { REVALIDATION_TIME } from '@constants/PageRevalidation';

function TestsPage(props: { spec: string }) {
  const spec = props.spec;
  const [tests, setTests] = useState<ITest[]>([]);
  const [taskType, setTaskType] = useState<ITaskType>();
  const [taskCheckType, setTaskCheckType] =
    useState<ITaskCheckType>();
  const { locale } = useLocale();

  useEffect(() => {
    sendRequest<
      undefined,
      {
        tests: ITest[];
        task_type: ITaskType;
        task_check_type: ITaskCheckType;
      }
    >(`task/tests/${spec}`, 'GET').then((res) => {
      if (!res.error) {
        setTests(res.response.tests);
        setTaskType(res.response.task_type);
        setTaskCheckType(res.response.task_check_type);
      }
    });
  }, [spec]);

  const form = useForm({
    initialValues: { tests },
  });

  const downloadTests = useCallback(async () => {
    const { downloadZip } = await import('client-zip');
    const files: { name: string; input: string }[] = [];
    tests.forEach((test, index) => {
      files.push({
        name: `input${index}.txt`,
        input: test.inputData,
      });
      files.push({
        name: `output${index}.txt`,
        input: test.outputData,
      });
    });
    const blob = await downloadZip(files).blob();
    const link = document.createElement('a');
    const href = URL.createObjectURL(blob);
    link.href = href;
    link.download = `${spec}_tests.zip`;
    link.click();
    link.remove();
    URL.revokeObjectURL(href);
  }, [tests, spec]);

  useEffect(() => {
    form.setFieldValue('tests', tests);
  }, [tests]); // eslint-disable-line

  return (
    <div className={stepperStyles.wrapper}>
      <Title title={locale.titles.task.tests} />
      <SingularSticky
        onClick={downloadTests}
        color="var(--primary)"
        icon={<Download />}
      />
      {form.values.tests.map((test, index) => (
        <div key={index} className={stepperStyles.example}>
          <ListItem
            field="tests"
            label={locale.task.form.test + ' #' + (index + 1)}
            inLabel={locale.task.form.inputTest}
            outLabel={locale.task.form.outputTest}
            form={form}
            hideInput={taskType && taskType.spec == 1}
            hideOutput={taskCheckType && taskCheckType.spec == 1}
            index={index}
            maxRows={7}
            minRows={3}
            readonly
          />
        </div>
      ))}
    </div>
  );
}

TestsPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TestsPage;

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
  const response = await fetch(
    `${API_URL}/api/task/exists/${params.spec}`
  );
  if (response.status === 200) {
    return {
      props: {
        spec: params.spec,
      },
      revalidate: REVALIDATION_TIME.task.tests,
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
