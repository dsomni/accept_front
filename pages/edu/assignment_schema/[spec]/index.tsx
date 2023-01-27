import { ReactNode, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getApiUrl } from '@utils/getServerUrl';
import { IAssignmentSchema } from '@custom-types/data/IAssignmentSchema';
import Description from '@components/AssignmentSchema/Description/Description';
import { DefaultLayout } from '@layouts/DefaultLayout';
import Sticky from '@ui/Sticky/Sticky';
import { Pencil, Trash } from 'tabler-icons-react';
import DeleteModal from '@components/AssignmentSchema/DeleteModal/DeleteModal';
import { useLocale } from '@hooks/useLocale';
import Title from '@ui/Title/Title';
import { REVALIDATION_TIME } from '@constants/PageRevalidation';

function AssignmentSchema(props: { assignment: IAssignmentSchema }) {
  const assignment = props.assignment;
  const [openModal, setOpenModal] = useState(false);
  const { locale } = useLocale();

  return (
    <>
      <Title
        title={`${locale.titles.assignment_schema.spec} ${assignment.title}`}
      />
      <Description assignment={assignment} />
      <DeleteModal
        active={openModal}
        setActive={setOpenModal}
        assignment={assignment}
      />
      <Sticky
        actions={[
          {
            color: 'green',
            href: `/edu/assignment_schema/edit/${assignment.spec}`,

            icon: <Pencil height={20} width={20} />,
          },
          {
            color: 'red',
            onClick: () => {
              setOpenModal(true);
            },
            icon: <Trash height={20} width={20} />,
          },
        ]}
      />
    </>
  );
}

AssignmentSchema.getLayout = (page: ReactNode) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default AssignmentSchema;

const API_ENDPOINT = getApiUrl();

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
    `${API_ENDPOINT}/api/assignment_schema/${params.spec}`,
    {
      method: 'GET',
    }
  );
  if (assignment.status === 200) {
    return {
      props: {
        assignment: await assignment.json(),
      },
      revalidate: REVALIDATION_TIME.assignment_schema.page,
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
