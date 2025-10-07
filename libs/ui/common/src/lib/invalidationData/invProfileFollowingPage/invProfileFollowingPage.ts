import {
  QueryAction,
  mostPopularUsersQueryKey,
  useResetQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';

export const invFollowingData = () => {
  return {
    followIfPublicUser: (pubUserId: string) => {}, // should be optional for all
    follow: () => {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      useResetQuery(QueryAction.Remove, userGetFollowersKey());

      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },

    unFollowIfPublicUser: (pubUserId: string) => {}, // should be optional for all
    unFollow: () => {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      useResetQuery(QueryAction.Remove, userGetFollowersKey());

      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },
  };
};
