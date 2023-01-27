import { IPieData } from '@custom-types/ui/IPlot';
import { FC, memo } from 'react';
import BarPlot from '../BarPlot/BarPlot';
import PiePlot from '../PiePlot/PiePlot';
import styles from './barPiePlot.module.css';

const BarPiePlot: FC<{
  title: string;
  data: IPieData[];
  centralLabel: FC<IPieData>;
  defaultText: IPieData;
}> = ({ title, data, centralLabel, defaultText }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.plots}>
        <div className={styles.pieWrapper}>
          <PiePlot
            data={data}
            centralLabel={centralLabel}
            defaultText={defaultText}
          />
        </div>
        <div className={styles.barWrapper}>
          <BarPlot data={data} />
        </div>
      </div>
    </div>
  );
};

export default memo(BarPiePlot);
