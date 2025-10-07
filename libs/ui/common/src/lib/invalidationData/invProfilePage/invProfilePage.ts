import {
  QueryAction,
  mostPopularUsersQueryKey,
  socialStatsQueryKey,
  useResetQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';

export const invProfilePage = () => {
  return {
    followIfPublicUser: (pubUserId: string) => {}, // should be optional for all
    follow: () => {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      useResetQuery(QueryAction.Invalidate, socialStatsQueryKey());
    },

    unFollowIfPublicUser: (pubUserId: string) => {}, // should be optional for all
    unFollow: () => {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      useResetQuery(QueryAction.Invalidate, socialStatsQueryKey());
    },
  };
};
