import { useSession } from 'next-auth/react';

function IndexPage() {
  const { data: session, status } = useSession();
  return (
    <>
      {status === 'authenticated' ? (
        <p>Signed in as {session?.user?.name}</p>
      ) : (
        <p>Not authenticated</p>
      )}
    </>
  );
}

export default IndexPage;
