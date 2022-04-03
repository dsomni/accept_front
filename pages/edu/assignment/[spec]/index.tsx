import { ReactNode, useCallback, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getServerUrl } from '@utils/getServerUrl';
import { IAssignmentSchema } from '@custom-types/IAssignmentSchema';
import Description from '@components/AssignmentSchema/Description/Description';
import { DefaultLayout } from '@layouts/DefaultLayout';
import Sticky from '@components/Sticky/Sticky';
import { Pencil1Icon, TrashIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { Button, Group, Modal } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import styles from '@styles/edu/assignment.module.css';
import { useLocale } from '@hooks/useLocale';
import { isSuccessful } from '@requests/request';

function Assignment(props: { assignment: IAssignmentSchema }) {
  const assignment = props.assignment;
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { locale } = useLocale();

  const handleDelete = useCallback(() => {
    isSuccessful<{}>('/assignments/schema/delete', 'POST', {
      spec: assignment.spec,
    }).then((res) =>
      res ? router.push('/edu/assignment/list') : {}
    );
  }, [assignment, router]);

  return (
    <>
      <Description assignment={assignment} />
      <Modal
        opened={openModal}
        centered
        hideCloseButton
        onClose={() => setOpenModal(false)}
        size="md"
        title={
          capitalize(locale.assignmentSchema.modals.delete) +
          ` '${assignment.title}'`
        }
        classNames={{
          title: styles.modalTitle,
        }}
      >
        <div className={styles.form}>
          <div className={styles.question}>
            {capitalize(
              locale.assignmentSchema.modals.deleteConfidence
            )}
          </div>
          <Group
            position="right"
            spacing="lg"
            className={styles.buttons}
          >
            <Button
              variant="outline"
              color="green"
              autoFocus
              onClick={() => setOpenModal(false)}
            >
              {capitalize(locale.cancel)}
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => handleDelete()}
            >
              {capitalize(locale.delete)}
            </Button>
          </Group>
        </div>
      </Modal>
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
