import { IUser } from '@custom-types/data/IUser';
import { Overlay } from '@mantine/core';
import { UserSelector } from '@ui/selectors';
import { FC, memo } from 'react';

const Users: FC<{ form: any; users: IUser[] }> = ({
  form,
  users,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      {form.values.broadcast && (
        <Overlay opacity={0.7} color="#fff" blur={2} />
      )}
      <UserSelector
        form={form}
        users={users}
        field={'logins'}
        initialUsers={form.values.logins}
      />
    </div>
  );
};

export default memo(Users);
