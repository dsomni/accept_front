import { IPlotData } from '@custom-types/ui/IPlot';
import { FC, memo, useMemo, useState } from 'react';
import PlotTooltip from '../PlotTooltip/PlotTooltip';
import Bar from './Bar/Bar';
import styles from './barPlot.module.css';

const PADDING = 0.1; // percent
const ROW_LINES = 10;

const BarPlot: FC<{
  title: string;
  total: number;
  data: IPlotData[];
}> = ({ title, total, data }) => {
  console.log(total, data);

  const [toolTipLabel, setToolTipLabel] = useState<
    string | undefined
  >(undefined);

  const padding = (300 / (data.length + 1)) * PADDING;
  const width = (300 - padding * (data.length + 1)) / data.length;

  const upperBound = useMemo(
    () =>
      Math.round(
        Math.max(...data.map((item) => item.amount)) / ROW_LINES +
          0.75
      ) * ROW_LINES,
    [data]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <PlotTooltip label={toolTipLabel} />
      <svg viewBox="0 0 330 110">
        <g>
          {new Array(ROW_LINES + 1).fill(0).map((_, index) => (
            <line
              key={index}
              x1="20"
              x2="320"
              y1={index * (100 / ROW_LINES)}
              y2={index * (100 / ROW_LINES)}
              stroke="black"
              strokeWidth={0.2}
              opacity="0.2"
            />
          ))}
        </g>
        <g>
          <line
            x1="20"
            x2="20"
            y1={0}
            y2={100}
            stroke="black"
            strokeWidth={0.2}
            opacity="0.2"
          />
          <line
            x1="320"
            x2="320"
            y1={0}
            y2={100}
            stroke="black"
            strokeWidth={0.2}
            opacity="0.2"
          />
          {new Array(ROW_LINES + 1).fill(0).map((_, index) => (
            <text
              key={index}
              className={styles.labels}
              x={15}
              y={index * (100 / ROW_LINES)}
              textAnchor="end"
            >
              {Math.round(upperBound / ROW_LINES) *
                (ROW_LINES - index)}
            </text>
          ))}
        </g>
        {data.map(({ label, amount }, index) => (
          <Bar
            key={index}
            label={label}
            amount={amount}
            index={index}
            width={width}
            height={100 * (amount / upperBound)}
            length={data.length}
            padding={padding}
            setTooltipLabel={setToolTipLabel}
          />
        ))}
      </svg>
    </div>
  );
};

export default memo(BarPlot);
