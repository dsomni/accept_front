import { DefaultLayout } from '@layouts/DefaultLayout';
import { FC, ReactElement, useEffect } from 'react';
import AuthProvider from 'src/providers/AuthProvider';

function TestPage() {
  return <div>TestPage</div>;
}

TestPage.getLayout = (page: ReactElement) => {
  return (
    <AuthProvider>
      <DefaultLayout>{page}</DefaultLayout>
    </AuthProvider>
  );
};
export default TestPage;
