import { IRole } from '@custom-types/data/atomic';
import { IGroup } from '@custom-types/data/IGroup';
import { IUser } from '@custom-types/data/IUser';
import { useRequest } from '@hooks/useRequest';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { useForm } from '@mantine/form';
import { UserSelector } from '@ui/selectors';
import { ReactElement, useCallback, useMemo } from 'react';

function TestPage() {
  const { data } = useRequest<
    {},
    any,
    {
      users: IUser[];
      groups: IGroup[];
      roles: IRole[];
    }
  >('notification/addBundle', 'GET');

  const users: IUser[] = useMemo(
    () => (data ? data.users : []),
    [data]
  );

  const form = useForm({
    initialValues: {
      members: [] as string[],
    },
  });

  const setFieldValue = useCallback(
    (users: string[]) => form.setFieldValue('members', users),
    [] // eslint-disable-line
  );
  const initialProps = useMemo(() => {
    form.getInputProps('members');
  }, []); // eslint-disable-line
  return (
    <div style={{ position: 'relative' }}>
      <UserSelector
        key={users.length}
        setFieldValue={setFieldValue}
        inputProps={initialProps}
        users={users}
        initialUsers={[]}
      />
    </div>
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
