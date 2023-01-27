import { ITaskInfo } from '@custom-types/data/IProfileInfo';
import { IPlotData } from '@custom-types/ui/IPlot';
import { BarPlot } from '@ui/Plot';
import { FC, memo, useMemo } from 'react';
// import styles from "./taskInfo.module.css"

const TaskInfo: FC<ITaskInfo> = ({
  total,
  verdict_destribution,
  complexity_distribution,
}) => {
  const complexity_data = useMemo(
    () =>
      complexity_distribution.map(
        (item) =>
          ({
            label: `${item.start}% - ${item.end}%`,
            amount: item.amount,
          } as IPlotData)
      ),
    [complexity_distribution]
  );
  return (
    <div>
      <BarPlot
        title={'Сложность задачи'}
        total={total}
        data={complexity_data}
      />
    </div>
  );
};

export default memo(TaskInfo);
