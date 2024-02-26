import { AuthenticationResponseDto } from '@tw/data';
import { atom, useAtom } from 'jotai';

// do i need to persist data if i have token???
// was not the whole point of query, to be in constant sync
// export const userAtom = atomWithPersist<AuthenticationResponseDto | null>(
//   'auth-user',
//   null
// );

export const userAtom = atom<AuthenticationResponseDto | null>(null);

export function useUser() {
  const [user, setUser] = useAtom(userAtom);

  return { user, setUser };
}
