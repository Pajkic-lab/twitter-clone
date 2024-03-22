import { AuthenticationResponseDto } from '@tw/data';
import { atom, useAtom } from 'jotai';

// export const userAtom = atomWithPersist<AuthenticationResponseDto | null>(
//   'auth-user',
//   null
// );

export const userAtom = atom<AuthenticationResponseDto | null>(null);

export function useUser() {
  const [user, setUser] = useAtom(userAtom);

  return { user, setUser };
}
