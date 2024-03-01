import { usePageLaneState, useSidebarState } from '@tw/ui/data-access';
import { useEffect } from 'react';
import { breakpoints } from './breakpoints';

export const BreakingPointSetter = () => {
  const { setCollapsed } = useSidebarState();
  const { setLeftLaneWidth } = usePageLaneState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= breakpoints['xl']) {
        setCollapsed(true);
        setLeftLaneWidth(85);
      } else {
        setCollapsed(false);
        setLeftLaneWidth(270);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};
