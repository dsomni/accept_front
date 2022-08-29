import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import { GetServerSideProps } from 'next';
import { ReactNode } from 'react';
import ProfileInfo from '@components/Profile/ProfileInfo/ProfileInfo';
import { IUser } from '@custom-types/data/IUser';
import styles from '@styles/profile/login.module.css';

function MyProfile(props: { user: IUser }) {
  return (
    <div className={styles.wrapper}>
      <ProfileInfo {...props} />
    </div>
  );
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
  if (!req || !req.url)
    return {
      redirect: {
        permanent: false,
        destination: '/profile/me',
      },
    };

  const login = req.url.slice(req.url.lastIndexOf('/') + 1);

  const response = await fetch(
    `${API_URL}/api/bundle/profile/${login}`,
    {
      headers: req.headers as { [key: string]: string },
    }
  );

  if (response.status === 307) {
    return {
      redirect: {
        permanent: false,
        destination: '/profile/me',
      },
    };
  }

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
      destination: '/Not-Found',
    },
  };
};
