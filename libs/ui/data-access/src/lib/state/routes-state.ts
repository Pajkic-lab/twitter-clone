import { useAtom } from 'jotai';
import { atomWithPersist } from './state-utils';

export const routeAtom = atomWithPersist<any>('auth-user', null);

export function useLastRoute() {
  const [lastRoute, setLastRoute] = useAtom(routeAtom);

  return { lastRoute, setLastRoute };
}
