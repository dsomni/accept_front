import { ReactNode, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getServerUrl } from '@utils/getServerUrl';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import Description from '@components/AssignmentSchema/Description/Description';
import { DefaultLayout } from '@layouts/DefaultLayout';
import Sticky from '@ui/Sticky/Sticky';
import { Pencil1Icon, TrashIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import DeleteModal from '@components/AssignmentSchema/DeleteModal/DeleteModal';

function Assignment(props: { assignment: IAssignmentSchema }) {
  const assignment = props.assignment;
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Description assignment={assignment} />
      <DeleteModal
        active={openModal}
        setActive={setOpenModal}
        assignment={assignment}
      />
      <Sticky
        color={'--primary'}
        actions={[
          {
            color: 'green',
            onClick: () => {
              router.push(`/edu/assignment/edit/${assignment.spec}`);
            },
            icon: <Pencil1Icon height={20} width={20} />,
          },
          {
            color: 'red',
            onClick: () => {
              setOpenModal(true);
            },
            icon: <TrashIcon height={20} width={20} />,
          },
        ]}
      />
    </>
  );
}

Assignment.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Assignment;

const SERVER_URL = getServerUrl();

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params?.spec !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  const assignment = await fetch(
    `${SERVER_URL}/api/assignments/schema/${params.spec}`,
    {
      method: 'GET',
    }
  );
  if (assignment.status === 200) {
    return {
      props: {
        assignment: await assignment.json(),
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
