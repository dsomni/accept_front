import { DefaultLayout } from '@layouts/DefaultLayout';
import ComponentToPDF from '@ui/ComponentToPDF/ComponentToPDF';
import { ReactElement } from 'react';

function TestPage() {
  return (
    <div>
      <ComponentToPDF
        component={(ref) => <div ref={ref}>123123</div>}
      />
    </div>
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
