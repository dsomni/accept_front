import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';

function TestPage() {
  return <></>;
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
