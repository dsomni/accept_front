import { GetServerSideProps, NextPage } from 'next';
import Todo from '@components/Todo/Todo';
import Title from '@ui/Title/Title';
import { useLocale } from '@hooks/useLocale';
import { getApiUrl } from '@utils/getServerUrl';
import { REVALIDATION_TIME } from '@constants/PageRevalidation';
import { IUserDisplay } from '@custom-types/data/IUser';
import { IRatingInfo } from '@custom-types/data/IRatingInfo';
import { ReactElement, useCallback, useEffect } from 'react';
import { DefaultLayout } from '@layouts/DefaultLayout';
import PrimitiveTable from '@ui/PrimitiveTable/PrimitiveTable';
import tableStyles from '@styles/ui/primitiveTable.module.css';
import styles from '@styles/rating.module.css';
import Link from 'next/link';

interface IndexedRatingInfo extends IRatingInfo {
  index: number;
}

function Rating(props: { users: IRatingInfo[] }) {
  const { locale } = useLocale();
  const users = props.users.map(
    (item, index) => ({ ...item, index } as IndexedRatingInfo)
  );

  const rowComponent = useCallback(
    (user: IndexedRatingInfo) => (
      <>
        <td>{user.index + 1}</td>
        <td>
          <Link
            className={styles.link}
            href={`/profile/${user.user.login}`}
          >
            {user.user.login}
          </Link>
        </td>
        <td>
          <Link
            className={styles.link}
            href={`/profile/${user.user.login}`}
          >
            {user.user.shortName}
          </Link>
        </td>
        <td>{user.score}</td>
      </>
    ),
    []
  );

  return (
    <>
      <Title title={locale.titles.rating} />
      <div className={styles.wrapper}>
        <PrimitiveTable
          rows={users}
          rowComponent={rowComponent}
          columns={['№', 'Логин', 'Ф.И.О', 'Счёт']}
          columnSizes={[1, 5, 10, 2]}
          classNames={{
            column: tableStyles.column,
            row: tableStyles.row,
            table: tableStyles.table,
            even: tableStyles.even,
          }}
        />
      </div>
    </>
  );
}

Rating.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default Rating;

const API_URL = getApiUrl();

// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before REVALIDATION_TIME.rating seconds,
// the cached value will be stale but still render (stale-while-revalidate=REVALIDATION_TIME.rating).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  const response = await fetch(`${API_URL}/api/rating/100`);
  if (response.status === 200) {
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=10, stale-while-revalidate=${REVALIDATION_TIME.rating}`
    );
    const response_json = await response.json();
    console.log(response_json.map((item: any) => item.user));
    return {
      props: {
        users: response_json,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
};
