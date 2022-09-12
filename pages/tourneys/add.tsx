import { ReactNode } from 'react';

import { DefaultLayout } from '@layouts/DefaultLayout';

function TournamentAdd() {
  return <></>;
}

TournamentAdd.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TournamentAdd;
