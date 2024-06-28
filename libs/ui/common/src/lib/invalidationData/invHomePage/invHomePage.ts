import {
  QueryAction,
  mostPopularUsersQueryKey,
  useResetQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';

export const invHomePage = () => {
  return {
    followIfPublicUser: (pubUserId: number) => {},
    follow: () => {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },

    unFollowIfPublicUser: (pubUserId: number) => {},
    unFollow: () => {
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },
  };
};
