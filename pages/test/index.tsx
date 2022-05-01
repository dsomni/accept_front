import { LoginLayout } from '@layouts/LoginLayout';
import { ReactElement } from 'react';

function TestPage() {
  return <p>Test</p>;
}

TestPage.getLayout = (page: ReactElement) => {
  return <LoginLayout title={'Вход'}>{page}</LoginLayout>;
};
export default TestPage;
