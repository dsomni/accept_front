import { useMediaQuery } from '@hooks/useMediaQuery';
import { FC, memo, useMemo } from 'react';
import Header from '@components/Header/Header';
import { links } from '@constants/MainHeaderLinks';
import { Sidebar } from '@components/Sidebar/Sidebar';

const Navbar: FC<{
  current: string;
  margin: boolean;
}> = ({ current, margin }) => {
  const isBreakpoint = useMediaQuery(1080);

  const style = useMemo(() => {
    let style: object = {
      width: '100%',
    };
    if (margin) {
      style = {
        ...style,
        position: 'absolute',
        zIndex: '5',
      };
    }
    return style;
  }, [margin]);

  return (
    <div style={style}>
      {!isBreakpoint ? (
        <Header
          links={links.main}
          dropdown={links.secondary}
          current={current}
        />
      ) : (
        <Sidebar
          links={links.main}
          dropdown={links.secondary}
          current={current}
        />
      )}
    </div>
  );
};

export default memo(Navbar);
