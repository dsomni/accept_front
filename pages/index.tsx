import { useUser } from '@hooks/useUser';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement } from 'react';

function IndexPage() {
  const { user } = useUser();

  return <>{user ? <p>SignIn as {user.name}</p> : <p>Not signIn</p>}</>;
}
IndexPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default IndexPage;
