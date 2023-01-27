import { IPieData } from '@custom-types/ui/IPlot';
import { FC, memo, useCallback } from 'react';
import styles from './arc.module.css';

const Arc: FC<{
  label: string;
  amount: number;
  color: string;
  prev: number;
  total: number;
  inner_radius: number;
  outer_radius: number;
  setCenterText: (_: IPieData | undefined) => void;
}> = ({
  label,
  color,
  amount,
  prev,
  total,
  inner_radius,
  outer_radius,
  setCenterText,
}) => {
  const offset = (2 * Math.PI * prev) / total;
  const angle = (2 * Math.PI * amount) / total - 0.01;
  const largeAngleFlag = angle >= Math.PI ? 1 : 0;
  const sn = Math.sin(angle);
  const cs = Math.cos(angle);
  const coords = [
    `M 0 ${-outer_radius}`, // MoveTo
    `A ${outer_radius} ${outer_radius} 0 ${largeAngleFlag} 1 ${
      outer_radius * sn
    } ${-outer_radius * cs}`, // Arc
    `L ${inner_radius * sn} ${-inner_radius * cs}`, // LineTo
    `A ${inner_radius} ${inner_radius} 0 ${largeAngleFlag} 0 0 ${-inner_radius}`, // Arc
    'Z', // Close Path
  ];
  const path = coords.join(' ');

  const onEnter = useCallback(
    () => setCenterText({ label, amount, color }),
    []
  );
  const onLeave = useCallback(() => setCenterText(undefined), []);

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
