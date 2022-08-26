import Description from '@components/AssignmentSchema/Description/Description';
import { FC, memo } from 'react';

const Preview: FC<{ form: any }> = ({ form }) => {
  return <Description assignment={form.values} preview />;
};

export default memo(Preview);
