import { IWidth } from '@custom-types/ui/atomic';
import { useMediaQuery } from '@mantine/hooks';
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface IWidthContext {
  width: IWidth;
}

const WidthContext = createContext<IWidthContext>(null!);

export const WidthProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [width, setWidth] = useState<IWidth>('phone-only');

  const tabletPortraitUp = useMediaQuery('(min-width: 600px)');
  const tabletLandscapeUp = useMediaQuery('(min-width: 900px)');
  const desktopUp = useMediaQuery('(min-width: 1200px)');
  const bigDesktopUp = useMediaQuery('(min-width: 1800px)');

  useEffect(() => {
    if (bigDesktopUp) {
      setWidth('big-desktop-up');
    } else if (desktopUp) {
      setWidth('desktop-up');
    } else if (tabletLandscapeUp) {
      setWidth('tablet-landscape-up');
    } else if (tabletPortraitUp) {
      setWidth('tablet-portrait-up');
    } else {
      setWidth('phone-only');
    }
  }, [bigDesktopUp, desktopUp, tabletLandscapeUp, tabletPortraitUp]);

  return (
    <WidthContext.Provider value={{ width }}>
      {children}
    </WidthContext.Provider>
  );
};

export function useWidth() {
  return useContext(WidthContext);
}
