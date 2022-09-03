import { FC, memo } from 'react';

const TaskList: FC<{ spec: string }> = ({ spec }) => {
  return <>{spec}</>;
};

export default memo(TaskList);
