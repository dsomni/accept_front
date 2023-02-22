import { IPlotData } from '@custom-types/ui/IPlot';
import { FC, memo, useCallback } from 'react';
import {
  GRID_LABELS_HEIGHT,
  GRID_NUMBERS_WIDTH,
  LABELS_FONT_SIZE,
  PLOT_AREA_HEIGHT,
  PLOT_AREA_WIDTH,
} from '../BarPlot';
import styles from './bar.module.css';

const Bar: FC<{
  index: number;
  data: IPlotData;
  width: number;
  height: number;
  length: number;
  padding: number;
  setTooltipLabel: (_: string | undefined) => void;
}> = ({
  index,
  data,
  width,
  height,
  length,
  padding,
  setTooltipLabel,
}) => {
  const onEnter = useCallback(
    () => setTooltipLabel(data.amount.toString()),
    [setTooltipLabel, data.amount]
  );
  const onLeave = useCallback(
    () => setTooltipLabel(undefined),
    [setTooltipLabel]
  );
  return (
    <>
      <g
        className={styles.wrapper}
        key={index}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <rect
          className={styles.bar}
          x={
            GRID_NUMBERS_WIDTH + index * width + padding * (index + 1)
          }
          width={width}
          y={PLOT_AREA_HEIGHT - height}
          height={2 + height}
          fill={data.color}
        />
        <rect
          x={GRID_NUMBERS_WIDTH + index * (PLOT_AREA_WIDTH / length)}
          width={PLOT_AREA_WIDTH / length}
          y={PLOT_AREA_HEIGHT}
          height={LABELS_FONT_SIZE * 2}
          fill="white"
        />
        <text
          className={styles.labels}
          x={
            GRID_NUMBERS_WIDTH +
            width * index +
            padding * (index + 1) +
            width / 2
          }
          y={
            PLOT_AREA_HEIGHT + LABELS_FONT_SIZE + LABELS_FONT_SIZE / 2
          }
          textAnchor="middle"
        >
          {data.label}
        </text>
      </g>
    </>
  );
};

export default memo(Bar);
