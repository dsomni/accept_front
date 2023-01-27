import { getColor } from '@constants/Colors';
import { ITaskInfo } from '@custom-types/data/IProfileInfo';
import { IPlotData } from '@custom-types/ui/IPlot';
import { BarPiePlot } from '@ui/Plot';
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
        (item, index) =>
          ({
            label: `${item.start}-${item.end}%`,
            amount: item.amount,
            color: getColor(index, 0), // 'var(--secondary)',
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
            } as IPlotData)
        ),
    [verdict_distribution]
  );

  return (
    <div className={styles.wrapper}>
      <BarPiePlot
        title={'Сложность решенных задач'}
        data={complexity_data}
        centralLabel={(centerText: IPlotData) => (
          <div className={styles.centerWrapper}>
            <div className={styles.complexityName}>
              {centerText.label}
            </div>
            <div className={styles.complexityAmount}>
              {centerText.amount}
            </div>
          </div>
        )}
        defaultText={{
          color: '',
          label: 'Всего',
          amount: total,
        }}
      />
      <BarPiePlot
        title={'Вердикты сданных задач'}
        data={verdict_data}
        centralLabel={(centerText: IPlotData) => (
          <div className={styles.centerWrapper}>
            <div
              className={styles.verdictName}
              style={{ color: centerText.color }}
            >
              {centerText.label}
            </div>
            <div className={styles.verdictAmount}>
              {centerText.amount}
            </div>
          </div>
        )}
        defaultText={{ label: 'Всего', amount: total, color: '' }}
      />
    </div>
  );
};

export default memo(TaskInfo);
