import { ReactNode, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import { useWidth } from '@hooks/useWidth';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { getApiUrl } from '@utils/getServerUrl';
import Sticky from '@ui/Sticky/Sticky';
import DeleteModal from '@components/Assignment/DeleteModal/DeleteModal';
import Description from '@components/Assignment/Description/Description';
import { Pencil, Trash } from 'tabler-icons-react';
import { STICKY_SIZES } from '@constants/Sizes';
import { IAssignment } from '@custom-types/data/IAssignment';

function Assignment(props: { assignment: IAssignment }) {
  const assignment = props.assignment;
  const [activeModal, setActiveModal] = useState(false);
  const [openedHint, setOpenedHint] = useState(false);

  const { locale, lang } = useLocale();
  const { isTeacher, isUser } = useUser();
  const { width } = useWidth();

  const router = useRouter();

  const actions = [
    {
      color: 'green',
      icon: (
        <Pencil
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      onClick: () =>
        router.push(`/edu/assignment/edit/${assignment.spec}`),
    },
    {
      color: 'red',
      icon: (
        <Trash
          width={STICKY_SIZES[width] / 3}
          height={STICKY_SIZES[width] / 3}
        />
      ),
      onClick: () => setActiveModal(true),
    },
  ];

  return (
    <>
      <DeleteModal
        active={activeModal}
        setActive={setActiveModal}
        assignment={assignment}
      />
      {isTeacher && <Sticky actions={actions} color={'--prime'} />}
      <Description assignment={assignment} />
    </>
  );
}

Assignment.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Assignment;

const API_URL = getApiUrl();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const response = await fetch(
    `${API_URL}/api/assignment/${params.spec}`
  );
  if (response.status === 200) {
    const assignment = await response.json();
    return {
      props: {
        assignment,
      },
      revalidate: 10 * 60,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/Not-Found',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
