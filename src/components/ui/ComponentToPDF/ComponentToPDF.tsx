import { pureCallback } from '@custom-types/ui/atomic';
import { Icon } from '@ui/basics';
import {
  FC,
  MutableRefObject,
  ReactNode,
  memo,
  useCallback,
  useRef,
} from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'tabler-icons-react';

const ComponentToPDF: FC<{
  title?: string;
  component: (
    _: MutableRefObject<HTMLDivElement | null>
  ) => ReactNode;
  beforeHandlePrint: pureCallback<Promise<void>>;
}> = ({ title, component, beforeHandlePrint }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    documentTitle: title,
    content: () => componentRef.current,
  });

  const handlePrintWrapper = useCallback(async () => {
    await beforeHandlePrint();
    setTimeout(() => handlePrint(), 200);
  }, [beforeHandlePrint, handlePrint]);

  return (
    <div>
      <Icon
        size="xs"
        color="var(--primary)"
        onClick={handlePrintWrapper}
      >
        <Printer />
      </Icon>
      <div style={{ display: 'none' }}>{component(componentRef)}</div>
    </div>
  );
};

export default memo(ComponentToPDF);
