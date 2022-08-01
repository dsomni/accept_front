import { DefaultLayout } from '@layouts/DefaultLayout';

import { ReactNode } from 'react';

function AssignmentAdd() {
  return <></>;
}

AssignmentAdd.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentAdd;
