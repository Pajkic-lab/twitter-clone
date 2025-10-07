import { theme } from '@tw/theme';
import { useMediabarState, useSidebarState } from '@tw/ui/data-access';
import { useEffect } from 'react';

export const BreakingPointSetter = () => {
  const { setSidebarCollapsed } = useSidebarState();
  const { setMediabarSize } = useMediabarState();
  const { breakpoints } = theme;

  // why IF blocks, use case block
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= breakpoints['xl']) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }

      if (window.innerWidth <= breakpoints['m']) {
        setMediabarSize('m');
      }
      if (window.innerWidth > breakpoints['m'] && window.innerWidth <= breakpoints['l']) {
        setMediabarSize('l');
      }
      if (window.innerWidth > breakpoints['l']) {
        setMediabarSize('xl');
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
