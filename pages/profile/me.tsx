import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';
import Profile from '@components/Profile/Profile';
import { IUser } from '@custom-types/data/IUser';
import Title from '@ui/Title/Title';
import { useLocale } from '@hooks/useLocale';

function MyProfile(props: { user: IUser }) {
  const { locale } = useLocale();
  return (
    <>
      <Title title={locale.titles.profile.me} />
      <Profile {...props} />;
    </>
  );
}

MyProfile.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyProfile;

const API_URL = getApiUrl();

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const response = await fetch(`${API_URL}/api/bundle/profile`, {
    headers: {
      cookie: req.headers.cookie,
    } as { [key: string]: string },
  });

  if (response.status === 200) {
    const profileData = await response.json();
    return {
      props: {
        user: profileData.user,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/signin?referrer=%2Fprofile%2Fme',
    },
  };
};
