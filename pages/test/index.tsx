import { Helper } from '@components/ui/Helper/Helper';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';

function TestPage() {
  return <Helper text={'some thing'} />;
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
