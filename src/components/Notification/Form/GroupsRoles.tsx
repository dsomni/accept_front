import { IRole } from '@custom-types/data/atomic';
import { IGroup } from '@custom-types/data/IGroup';
import { GroupSelector, RoleSelector } from '@ui/selectors';
import { FC, memo } from 'react';

const GroupsRoles: FC<{
  form: any;
  groups: IGroup[];
  roles: IRole[];
}> = ({ form, groups, roles }) => {
  return (
    <>
      <RoleSelector
        form={form}
        roles={roles}
        initialRoles={[]}
        field={'roles'}
      />
      <GroupSelector
        form={form}
        groups={groups}
        initialGroups={[]}
        field={'groups'}
      />
    </>
  );
};

export default memo(GroupsRoles);
