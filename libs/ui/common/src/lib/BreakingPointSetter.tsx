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
        // setLeftLaneWidth(85); // number can not be defined here it has to come from some central place
      } else {
        setCollapsed(false);
        // setLeftLaneWidth(230); // number can not be defined here it has to come from some central place
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
