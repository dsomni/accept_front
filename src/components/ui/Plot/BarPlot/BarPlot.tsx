import { IPlotData } from '@custom-types/ui/IPlot';
import { FC, memo } from 'react';
import styles from './barPlot.module.css';

const PADDING = 0.1; // precent
const ROW_LINES = 10;

const BarPlot: FC<{
  title: string;
  total: number;
  data: IPlotData[];
}> = ({ title, total, data }) => {
  console.log(total, data);
  const padding = (300 / data.length) * PADDING;
  const width = (300 - padding * data.length) / data.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <svg viewBox="0 0 320 110">
        <g>
          {new Array(ROW_LINES + 1).fill(0).map((_, index) => (
            <line
              key={index}
              x1="20"
              x2="320"
              y1={index * (100 / ROW_LINES)}
              y2={index * (100 / ROW_LINES)}
              stroke="black"
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
            opacity="0.2"
          />
          <line
            x1="320"
            x2="320"
            y1={0}
            y2={100}
            stroke="black"
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
              {Math.round(total / ROW_LINES) * (ROW_LINES - index)}
            </text>
          ))}
        </g>
        {data.map(({ label, amount }, index) => (
          <g key={index}>
            <rect
              className={styles.bar}
              x={20 + index * width + padding * index}
              width={width}
              y={100 - 100 * (amount / total)}
              height={100 * (amount / total)}
            />
            <rect
              x={20 + index * (300 / data.length)}
              width={300 / data.length}
              y={100}
              height={10}
              fill="white"
            />
            <text
              className={styles.labels}
              x={20 + width * index + padding * index + width / 2}
              y={105}
              textAnchor="middle"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default memo(BarPlot);
