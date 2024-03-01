import { atom, useAtom } from 'jotai';

/**
 * Number present size in px
 */
export const leftLaneWidthAtom = atom<number>(270);
export const centralLaneWidthAtom = atom<number>(598);
export const rightLaneWidthAtom = atom<number>(380);

export function usePageLaneState() {
  const [leftLaneWidth, setLeftLaneWidth] = useAtom(leftLaneWidthAtom);
  const [centralLaneWidth, setCentralLaneWidth] = useAtom(centralLaneWidthAtom);
  const [rightLaneWidth, setRightLaneWidth] = useAtom(rightLaneWidthAtom);

  return {
    leftLaneWidth,
    centralLaneWidth,
    rightLaneWidth,
    setLeftLaneWidth,
    setCentralLaneWidth,
    setRightLaneWidth,
  };
}