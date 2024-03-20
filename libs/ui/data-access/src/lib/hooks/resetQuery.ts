import { queryClient } from './core';

export enum QueryAction {
  Remove = 'remove',
  Invalidate = 'invalidate',
}
export async function useResetQuery(queryAction: QueryAction, key: string[]) {
  console.log('res', key);
  if (queryAction === QueryAction.Invalidate) {
    const res = await queryClient.invalidateQueries({ queryKey: key });
    console.log('query inv response', res);
  }
  if (queryAction === QueryAction.Remove) {
    queryClient.removeQueries({ queryKey: [key] });
  }
}
