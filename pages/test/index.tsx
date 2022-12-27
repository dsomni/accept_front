import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';

function TestPage() {
  return <div>Тестовая страница😳😳😳😳😳😳</div>;
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
