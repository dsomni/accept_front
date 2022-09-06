import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';

function TestPage() {
  console.log(new Date().getTimezoneOffset());
  return (
    <div
      style={{
        width: '500px',
        overflow: 'scroll',
        height: '200px',
      }}
    ></div>
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
