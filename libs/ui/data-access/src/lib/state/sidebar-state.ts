import { atom, useAtom } from 'jotai';

export const sidebarAtom = atom<boolean>(false);

export function useSidebarState() {
  const [collapsed, setCollapsed] = useAtom(sidebarAtom);

  return { collapsed, setCollapsed };
}
