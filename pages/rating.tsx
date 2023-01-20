import { GetServerSideProps, NextPage } from 'next';
import Todo from '@components/Todo/Todo';
import Title from '@ui/Title/Title';
import { useLocale } from '@hooks/useLocale';
import { getApiUrl } from '@utils/getServerUrl';
import { REVALIDATION_TIME } from '@constants/PageRevalidation';
import { IUserDisplay } from '@custom-types/data/IUser';

const Rating: NextPage<{ users: [IUserDisplay, number][] }> = ({
  users,
}) => {
  const { locale } = useLocale();
  console.log(users);
  return (
    <>
      <Title title={locale.titles.rating} />
      <Todo />
    </>
  );
};
export default Rating;

const API_URL = getApiUrl();

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${API_URL}/api/rating`);
  if (response.status === 200) {
    const response_json = await response.json();
    return {
      props: {
        users: response_json,
      },
      revalidate: REVALIDATION_TIME.rating,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
};
