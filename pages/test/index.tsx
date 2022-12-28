import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { CustomEditor } from '@ui/basics';
import { ReactElement } from 'react';

function TestPage() {
  const form = useForm({
    initialValues: {
      description: '',
    },
  });
  return (
    <CustomEditor
      label={'test area'}
      form={form}
      name={'description'}
    />
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
