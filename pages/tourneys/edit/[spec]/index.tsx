import { ReactNode } from 'react';
import { DefaultLayout } from '@layouts/DefaultLayout';

function TournamentEdit() {
  return <></>;
}

TournamentEdit.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default TournamentEdit;
