import { atom, useAtom } from 'jotai';

export const sidebarAtom = atom<boolean>(false);

export function useSidebarState() {
  const [sidebarCollapsed, setSidebarCollapsed] = useAtom(sidebarAtom);

  return { sidebarCollapsed, setSidebarCollapsed };
}
