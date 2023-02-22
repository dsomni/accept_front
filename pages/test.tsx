import { IPlotData } from '@custom-types/ui/IPlot';
import { BarPlot } from '@ui/Plot';
import { FC, memo } from 'react';

const plotData: IPlotData[] = [
  { label: 'One', amount: 15, color: '#ffaaff' },
  { label: 'Two', amount: 0, color: '#ffaaff' },
  { label: 'Tree', amount: 10, color: '#ffaaff' },
  { label: 'For', amount: 85, color: '#ffaaff' },
  { label: 'Five', amount: 7, color: '#ffaaff' },
];

const Test: FC<{}> = ({}) => {
  return (
    <div
      style={{
        filter: 'brightness(25%)',
      }}
    >
      <div style={{ width: '500px' }}>
        <BarPlot title="Horizontal" data={plotData} />
      </div>
      <div style={{ width: '250px' }}>
        <BarPlot title="Vertical" data={plotData} vertical />
      </div>
    </div>
  );
};

export default memo(Test);
