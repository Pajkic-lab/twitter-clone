import { queryClient } from './core';

export enum QueryAction {
  Remove = 'remove',
  Invalidate = 'invalidate',
}
export function useResetQuery(
  queryAction: QueryAction,
  key: string | string[]
) {
  if (queryAction === QueryAction.Invalidate) {
    queryClient.invalidateQueries({ queryKey: [key] });
  }
  if (queryAction === QueryAction.Remove) {
    queryClient.removeQueries({ queryKey: [key] });
  }
}
