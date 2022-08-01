import { DefaultLayout } from '@layouts/DefaultLayout';

import { ReactNode } from 'react';

function AssignmentPage() {
  return <></>;
}

AssignmentPage.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentPage;
