import { queryClient } from './core';

export enum QueryAction {
  Remove = 'remove',
  Invalidate = 'invalidate',
  Refetch = 'Refetch',
}
export async function useResetQuery(queryAction: QueryAction, key: string[]) {
  if (queryAction === QueryAction.Invalidate) {
    queryClient.invalidateQueries({ queryKey: key });
  }
  if (queryAction === QueryAction.Remove) {
    queryClient.removeQueries({ queryKey: [key] });
  }
  if (queryAction === QueryAction.Refetch) {
    queryClient.refetchQueries({ queryKey: [key] });
  }
}
