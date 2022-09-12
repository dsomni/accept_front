import { ReactNode } from 'react';

import { DefaultLayout } from '@layouts/DefaultLayout';

function TournamentAddTask() {
  return <></>;
}

TournamentAddTask.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TournamentAddTask;
