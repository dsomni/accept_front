import { FC, memo, useCallback } from 'react';
import styles from './bar.module.css';

const Bar: FC<{
  index: number;
  label: string;
  amount: number;
  width: number;
  height: number;
  length: number;
  padding: number;
  setTooltipLabel: (_: string | undefined) => void;
}> = ({
  index,
  label,
  amount,
  width,
  height,
  length,
  padding,
  setTooltipLabel,
}) => {
  const onEnter = useCallback(
    () => setTooltipLabel(amount.toString()),
    [setTooltipLabel, amount]
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
          x={20 + index * width + padding * (index + 1)}
          width={width}
          y={100 - height}
          height={2 + height}
        />
        <rect
          x={20 + index * (300 / length)}
          width={300 / length}
          y={100}
          height={10}
          fill="white"
        />
        <text
          className={styles.labels}
          x={20 + width * index + padding * (index + 1) + width / 2}
          y={105}
          textAnchor="middle"
        >
          {label}
        </text>
      </g>
    </>
  );
};

export default memo(Bar);
