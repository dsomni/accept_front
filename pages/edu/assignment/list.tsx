import { DefaultLayout } from '@layouts/DefaultLayout';

import { ReactNode } from 'react';

function AssignmentList() {
  return <></>;
}

AssignmentList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentList;
