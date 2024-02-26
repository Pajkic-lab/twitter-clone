import { atomWithStorage } from 'jotai/utils';

/**
 *
 * There is a problem with flickering when using persistance
 * It's a problem since both async and sync storages are supported
 * Solution based on solution by maintainer:
 * https://github.com/pmndrs/jotai/discussions/1737#discussioncomment-4861989
 */
export function atomWithPersist<T>(key: string, defaultValue: T) {
  const fullKey = `jotai.${key}`;
  const inState = localStorage.getItem(fullKey);

  const createdAtom = atomWithStorage<T>(
    fullKey,
    inState ? JSON.parse(inState) : defaultValue
  );
  return createdAtom;
}
