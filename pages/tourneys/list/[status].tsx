import { DefaultLayout } from '@layouts/DefaultLayout';

import { ReactNode } from 'react';

function TournamentList() {
  return <></>;
}

TournamentList.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TournamentList;
