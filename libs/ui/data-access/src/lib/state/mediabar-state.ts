import { BreakpointKeys } from '@tw/ui/common';
import { atom, useAtom } from 'jotai';

export const mediabarAtom = atom<BreakpointKeys>('s');

export function useMediabarState() {
  const [mediabarSize, setMediabarSize] = useAtom(mediabarAtom);

  return {
    mediabarSize,
    setMediabarSize,
  };
}
