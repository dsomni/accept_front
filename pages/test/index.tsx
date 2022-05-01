import { Helper } from '@components/ui/Helper/Helper';
import { InfoButton } from '@components/ui/InfoButton/InfoButton';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';

function TestPage() {
  return (
    <InfoButton text={'some thing'} onClick={() => console.log(10)} />
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
