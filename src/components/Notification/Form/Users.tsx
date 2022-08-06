import { IUser } from '@custom-types/data/IUser';
import { Overlay } from '@ui/basics';
import { UserSelector } from '@ui/selectors';
import { FC, memo } from 'react';

const Users: FC<{ form: any; users: IUser[] }> = ({
  form,
  users,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      {form.values.broadcast && <Overlay />}
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
