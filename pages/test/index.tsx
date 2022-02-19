import { DefaultLayout } from '@layouts/DefaultLayout';
import { FC, ReactElement } from 'react';

function TestPage() {
  return <div>TestPage</div>;
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
