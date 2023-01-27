import { IPieData } from '@custom-types/ui/IPlot';
import { FC, memo, useCallback, useState } from 'react';
import styles from './arc.module.css';

const Arc: FC<{
  label: string;
  amount: number;
  color: string;
  prev: number;
  total: number;
  inner_radius: number;
  outer_radius: number;
  increase_ratio: number;
  setCenterText: (_: IPieData | undefined) => void;
}> = ({
  label,
  color,
  amount,
  prev,
  total,
  inner_radius,
  outer_radius,
  increase_ratio,
  setCenterText,
}) => {
  const [outerRadius, setOuterRadius] = useState(outer_radius);

  const offset = (2 * Math.PI * prev) / total;
  const angle = (2 * Math.PI * amount) / total - 0.01;
  const largeAngleFlag = angle >= Math.PI ? 1 : 0;
  const sn = Math.sin(angle);
  const cs = Math.cos(angle);
  const coords = [
    `M 0 ${-outerRadius}`, // MoveTo
    `A ${outerRadius} ${outerRadius} 0 ${largeAngleFlag} 1 ${
      outerRadius * sn
    } ${-outerRadius * cs}`, // Arc
    `L ${inner_radius * sn} ${-inner_radius * cs}`, // LineTo
    `A ${inner_radius} ${inner_radius} 0 ${largeAngleFlag} 0 0 ${-inner_radius}`, // Arc
    'Z', // Close Path
  ];
  const path = coords.join(' ');

  const onEnter = useCallback(() => {
    setCenterText({ label, amount, color });
    setOuterRadius(outer_radius * increase_ratio);
  }, [
    amount,
    color,
    increase_ratio,
    label,
    outer_radius,
    setCenterText,
  ]);
  const onLeave = useCallback(() => {
    setCenterText(undefined);
    setOuterRadius(outer_radius);
  }, [outer_radius, setCenterText]);

  return (
    <path
      className={styles.arc}
      d={path}
      transform={`rotate(${(offset / Math.PI) * 180})`}
      fill={color}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    />
  );
};

export default memo(Arc);
