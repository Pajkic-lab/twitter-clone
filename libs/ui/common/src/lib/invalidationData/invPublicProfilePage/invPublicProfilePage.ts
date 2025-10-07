import {
  QueryAction,
  publicProfileFollowersKey,
  publicUserFollowingStatsQueryKey,
  publicUserSocialStatsQueryKey,
  useResetQuery,
  userGetFollowingKey,
} from '@tw/ui/data-access';

export const invPublicProfilePage = () => {
  return {
    followIfPublicUser: (pubUserId: string) => {
      useResetQuery(QueryAction.Invalidate, publicUserSocialStatsQueryKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, publicUserFollowingStatsQueryKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, publicProfileFollowersKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
    },
    follow: () => {},

    unFollowIfPublicUser: (pubUserId: string) => {
      useResetQuery(QueryAction.Invalidate, publicUserSocialStatsQueryKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, publicUserFollowingStatsQueryKey(pubUserId));

      useResetQuery(QueryAction.Invalidate, publicProfileFollowersKey(pubUserId));
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
    },
    unFollow: () => {},
  };
};
