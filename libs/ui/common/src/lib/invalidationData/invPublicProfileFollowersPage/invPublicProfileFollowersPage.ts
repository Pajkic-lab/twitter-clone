import {
  QueryAction,
  mostPopularUsersQueryKey,
  publicProfileFollowersKey,
  publicProfileFollowingKey,
  useResetQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';

export const invPublicProfileFollowersData = () => {
  return {
    followIfPublicUser: (pubUserId: number) => {
      useResetQuery(QueryAction.Invalidate, publicProfileFollowersKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, publicProfileFollowingKey(pubUserId));
    },
    follow: () => {
      useResetQuery(QueryAction.Refetch, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },

    unFollowIfPublicUser: (pubUserId: number) => {
      useResetQuery(QueryAction.Invalidate, publicProfileFollowersKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, publicProfileFollowingKey(pubUserId));
    },
    unFollow: () => {
      useResetQuery(QueryAction.Refetch, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },
  };
};

export const invPublicProfileMediabarData = () => {
  return {
    followIfPublicUser: (pubUserId: number) => {
      useResetQuery(QueryAction.Invalidate, publicProfileFollowersKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, publicProfileFollowingKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },
    follow: () => {},

    unFollowIfPublicUser: (pubUserId: number) => {
      useResetQuery(QueryAction.Invalidate, publicProfileFollowersKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, publicProfileFollowingKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },
    unFollow: () => {},
  };
};
