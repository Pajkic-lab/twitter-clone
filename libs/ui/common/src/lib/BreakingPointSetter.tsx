import { useSidebarState } from '@tw/ui/data-access';
import { useEffect } from 'react';
import { breakpoints } from './breakpoints';

export const BreakingPointSetter = () => {
  const { setCollapsed } = useSidebarState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= breakpoints['xl']) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
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
