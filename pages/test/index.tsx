import CustomEditor from '@components/CustomEditor/CustomEditor';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { FC, ReactElement, useEffect, useState } from 'react';
import AuthProvider from 'src/providers/AuthProvider';

function TestPage() {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <CustomEditor
        name="test"
        label="test"
        value=""
        onChange={(data) => setData(data)}
      ></CustomEditor>
    </>
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return (
    <AuthProvider>
      <DefaultLayout>{page}</DefaultLayout>
    </AuthProvider>
  );
};
export default TestPage;
