import { DefaultLayout } from '@layouts/DefaultLayout';

import { ReactNode } from 'react';

function AssignmentEdit() {
  return <></>;
}

AssignmentEdit.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentEdit;
