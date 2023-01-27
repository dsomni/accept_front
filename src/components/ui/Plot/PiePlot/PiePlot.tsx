import { IPieData } from '@custom-types/ui/IPlot';
import { FC, memo, useMemo, useState } from 'react';
import Arc from './Arc/Arc';
import styles from './piePlot.module.css';

const INNER_RADIUS = 25;
const OUTER_RADIUS = 50;
const INCREASE_RATIO = 1.1;

const PiePlot: FC<{
  title?: string;
  data: IPieData[];
  centralLabel: FC<IPieData>;
  defaultText: IPieData;
}> = ({ title, data, centralLabel, defaultText }) => {
  const [centerText, setCenterText] = useState<IPieData | undefined>(
    undefined
  );

  const processedData = useMemo(
    () => data.filter((item) => item.amount > 0),
    [data]
  );

  const accumulated = useMemo(
    () =>
      processedData.reduce(
        (prev, item) => [
          ...prev,
          prev[prev.length - 1] + item.amount,
        ],
        [0]
      ),
    [processedData]
  );

  const total = useMemo(
    () => accumulated[accumulated.length - 1],
    [accumulated]
  );

  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.title}>{title}</div>}
      <svg
        viewBox={`0 0 ${100 * INCREASE_RATIO} ${
          100 * INCREASE_RATIO
        }`}
      >
        <g
          transform={`translate(${50 * INCREASE_RATIO}, ${
            50 * INCREASE_RATIO
          })`}
        >
          {processedData.map((item, index) => (
            <Arc
              key={index}
              label={item.label}
              amount={item.amount}
              color={item.color}
              total={total}
              prev={accumulated[index]}
              inner_radius={INNER_RADIUS}
              outer_radius={OUTER_RADIUS}
              setCenterText={setCenterText}
              increase_ratio={INCREASE_RATIO}
            />
          ))}
          <foreignObject
            x={-INNER_RADIUS * Math.sin(Math.PI / 4)}
            y={-INNER_RADIUS * Math.sin(Math.PI / 4)}
            width={2 * INNER_RADIUS * Math.sin(Math.PI / 4)}
            height={2 * INNER_RADIUS * Math.sin(Math.PI / 4)}
          >
            {centerText
              ? centralLabel(centerText)
              : centralLabel(defaultText)}
          </foreignObject>
        </g>
      </svg>
    </div>
  );
};

export default memo(PiePlot);
