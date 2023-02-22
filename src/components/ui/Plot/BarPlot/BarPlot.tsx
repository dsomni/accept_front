import { IPlotData } from '@custom-types/ui/IPlot';
import { FC, memo, useMemo, useState } from 'react';
import PlotTooltip from '../PlotTooltip/PlotTooltip';
import Bar from './Bar/Bar';
import styles from './barPlot.module.css';

export const PADDING = 0.1; // percent
export const PLOT_AREA_WIDTH = 300;
export const PLOT_AREA_HEIGHT = 150;

export const LABELS_FONT_SIZE = 6;

export const GRID_LINES_NUMBER = 10;
export const GRID_LINE_STROKE_WIDTH = 0.5; //0.2
export const GRID_LINE_OPACITY = 1; // 0.2
export const GRID_LINE_HEIGHT = PLOT_AREA_HEIGHT / GRID_LINES_NUMBER;
export const GRID_LABELS_HEIGHT =
  PLOT_AREA_HEIGHT + LABELS_FONT_SIZE / 2;
export const GRID_LINE_LEBEL_HEIGHT =
  GRID_LABELS_HEIGHT / GRID_LINES_NUMBER;
export const GRID_NUMBERS_WIDTH = 20;

export const TOTAL_HEIGHT = PLOT_AREA_HEIGHT + 2 * LABELS_FONT_SIZE;
export const TOTAL_WIDTH = PLOT_AREA_WIDTH + GRID_NUMBERS_WIDTH;

const BarPlot: FC<{
  title?: string;
  data: IPlotData[];
  vertical?: boolean;
}> = ({ title, data, vertical }) => {
  const [toolTipLabel, setToolTipLabel] = useState<
    string | undefined
  >(undefined);

  const bar_padding = (PLOT_AREA_WIDTH / (data.length + 1)) * PADDING;
  const bar_width =
    (PLOT_AREA_WIDTH - bar_padding * (data.length + 1)) / data.length;

  const upperBound = useMemo(
    () =>
      Math.round(
        Math.max(...data.map((item) => item.amount)) /
          GRID_LINES_NUMBER +
          0.75
      ) * GRID_LINES_NUMBER,
    [data]
  );

  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.title}>{title}</div>}
      <PlotTooltip label={toolTipLabel} />
      <svg
        style={{
          width: '100%',
          aspectRatio: !vertical ? '2/1' : '1/2',
        }}
        viewBox={`0 0 ${!vertical ? TOTAL_WIDTH : TOTAL_HEIGHT} ${
          !vertical ? TOTAL_HEIGHT : TOTAL_WIDTH
        }`}
      >
        <g
          transform={
            vertical
              ? `translate(0, -${TOTAL_HEIGHT}) rotate(90, 0, ${TOTAL_HEIGHT})`
              : ''
          }
        >
          <g>
            {new Array(GRID_LINES_NUMBER).fill(0).map((_, index) => (
              <line
                key={index}
                x1={GRID_NUMBERS_WIDTH}
                x2={TOTAL_WIDTH}
                y1={index * GRID_LINE_HEIGHT}
                y2={index * GRID_LINE_HEIGHT}
                stroke="black"
                strokeWidth={GRID_LINE_STROKE_WIDTH}
                opacity={GRID_LINE_OPACITY}
              />
            ))}
          </g>
          <g>
            <line
              x1={GRID_NUMBERS_WIDTH}
              x2={GRID_NUMBERS_WIDTH}
              y1={0}
              y2={PLOT_AREA_HEIGHT}
              stroke="black"
              strokeWidth={GRID_LINE_STROKE_WIDTH}
              opacity={GRID_LINE_OPACITY}
            />
            <line
              x1={TOTAL_WIDTH}
              x2={TOTAL_WIDTH}
              y1={0}
              y2={PLOT_AREA_HEIGHT}
              stroke="black"
              strokeWidth={GRID_LINE_STROKE_WIDTH}
              opacity={GRID_LINE_OPACITY}
            />
            {new Array(GRID_LINES_NUMBER + 1)
              .fill(0)
              .map((_, index) => (
                <text
                  key={index}
                  style={{ fontSize: `${LABELS_FONT_SIZE}px` }}
                  x={15}
                  y={index * GRID_LINE_LEBEL_HEIGHT}
                  textAnchor="end"
                >
                  {Math.round(upperBound / GRID_LINES_NUMBER) *
                    (GRID_LINES_NUMBER - index)}
                </text>
              ))}
          </g>
        </g>
        <g
          transform={
            vertical
              ? `translate(0, -${TOTAL_HEIGHT}) rotate(90, 0, ${TOTAL_HEIGHT})`
              : ''
          }
        >
          {data.map((item, index) => (
            <Bar
              key={index}
              data={item}
              index={index}
              width={bar_width}
              height={PLOT_AREA_HEIGHT * (item.amount / upperBound)}
              length={data.length}
              padding={bar_padding}
              setTooltipLabel={setToolTipLabel}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default memo(BarPlot);
