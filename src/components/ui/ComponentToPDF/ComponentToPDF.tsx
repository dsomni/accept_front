import { Icon } from '@ui/basics';
import { FC, MutableRefObject, ReactNode, memo, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Printer } from 'tabler-icons-react';

const ComponentToPDF: FC<{
  component: (
    _: MutableRefObject<HTMLDivElement | null>
  ) => ReactNode;
}> = ({ component }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <Icon color="var(--primary)" size="sm">
            <Printer />
          </Icon>
        )}
        content={() => componentRef.current}
      />
      <div style={{ display: 'none' }}>{component(componentRef)}</div>
    </div>
  );
};

export default memo(ComponentToPDF);
