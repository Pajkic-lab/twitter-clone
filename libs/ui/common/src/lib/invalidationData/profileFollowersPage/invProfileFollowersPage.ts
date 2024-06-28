import {
  QueryAction,
  mostPopularUsersQueryKey,
  useResetQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';

export const invFollowersData = () => {
  return {
    followIfPublicUser: (pubUserId: number) => {},
    follow: () => {
      useResetQuery(QueryAction.Refetch, userGetFollowingKey()); // why is refetch here???
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },

    unFollowIfPublicUser: (pubUserId: number) => {},
    unFollow: () => {
      useResetQuery(QueryAction.Refetch, userGetFollowingKey()); // why is refetch here???
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },
  };
};

export const invMediabarData = () => {
  return {
    followIfPublicUser: (pubUserId: number) => {},
    follow: () => {
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
    },

    unFollowIfPublicUser: (pubUserId: number) => {},
    unFollow: () => {
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
    },
  };
};
