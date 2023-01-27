import { ITaskInfo } from '@custom-types/data/IProfileInfo';
import { IPieData, IPlotData } from '@custom-types/ui/IPlot';
import { BarPlot, PiePlot } from '@ui/Plot';
import { FC, memo, useMemo } from 'react';
import styles from './taskInfo.module.css';

const TaskInfo: FC<ITaskInfo> = ({
  total,
  verdict_distribution,
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

  const verdict_data = useMemo(
    () =>
      verdict_distribution
        .sort((a, b) => b.amount - a.amount)
        .map(
          (item) =>
            ({
              label: item.name,
              amount: item.amount,
              color: item.name === 'OK' ? '#00FF55' : '#FF2222',
            } as IPieData)
        ),
    [verdict_distribution]
  );

  return (
    <div className={styles.wrapper}>
      <BarPlot
        title={'Сложность решенных задач'}
        data={complexity_data}
      />
      <PiePlot title={'Вердикты сданных задач'} data={verdict_data} />
    </div>
  );
};

export default memo(TaskInfo);
