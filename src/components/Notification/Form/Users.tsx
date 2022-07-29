import { IUser } from '@custom-types/data/IUser';
import { UserSelector } from '@ui/selectors';
import { FC, memo } from 'react';

const Users: FC<{ form: any; users: IUser[] }> = ({
  form,
  users,
}) => {
  return <UserSelector form={form} users={users} field={'logins'} />;
};

export default memo(Users);
