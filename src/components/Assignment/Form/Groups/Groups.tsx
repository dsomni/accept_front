import { FC, memo } from 'react';
import { GroupSelector } from '@ui/selectors';
import { IGroup } from '@custom-types/data/IGroup';

const Groups: FC<{ form: any; groups: IGroup[] }> = ({
  form,
  groups,
}) => {
  return (
    <>
      <GroupSelector
        form={form}
        groups={groups}
        initialGroups={form.values.groups}
        field={'groups'}
      />
    </>
  );
};

export default memo(Groups);
