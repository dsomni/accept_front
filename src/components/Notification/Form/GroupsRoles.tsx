import { IRole } from '@custom-types/data/atomic';
import { IGroup } from '@custom-types/data/IGroup';
import { GroupSelector, RoleSelector } from '@ui/selectors';
import { FC, memo } from 'react';
import { Overlay, Switch } from '@ui/basics';
import { useLocale } from '@hooks/useLocale';

const GroupsRoles: FC<{
  form: any;
  groups: IGroup[];
  roles: IRole[];
}> = ({ form, groups, roles }) => {
  const { locale } = useLocale();
  return (
    <>
      <Switch
        label={locale.notification.form.broadcast}
        helperContent={
          <div>
            {locale.helpers.notification.broadcast.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        }
        {...form.getInputProps('broadcast', { type: 'checkbox' })}
      />
      <div style={{ position: 'relative' }}>
        {form.values.broadcast && <Overlay />}
        <RoleSelector
          form={form}
          roles={roles}
          initialRoles={form.values.roles}
          field={'roles'}
        />
        <GroupSelector
          form={form}
          groups={groups}
          initialGroups={form.values.groups}
          field={'groups'}
        />
      </div>
    </>
  );
};

export default memo(GroupsRoles);
