import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';
import Profile from '@components/Profile/Profile';
import { IUser } from '@custom-types/data/IUser';

function MyProfile(props: { user: IUser }) {
  return <Profile {...props} />;
}

MyProfile.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyProfile;

const API_URL = getApiUrl();

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  const response = await fetch(`${API_URL}/api/bundle/profile`, {
    headers: req.headers as { [key: string]: string },
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
