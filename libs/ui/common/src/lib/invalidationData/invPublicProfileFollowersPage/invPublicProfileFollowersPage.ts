import { FollowerListResponseDto, MostPopularUsersResponseDto } from '@tw/data';
import {
  QueryAction,
  mostPopularUsersQueryKey,
  publicProfileFollowersKey,
  publicProfileFollowingKey,
  useResetQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';

export const invPublicProfileFollowersData = (
  userList: FollowerListResponseDto[],
  mostPopularUsers: MostPopularUsersResponseDto[] | undefined
) => {
  return {
    followIfPublicUser: (pubUserId: number) => {
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowersKey(pubUserId)
      );
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowingKey(pubUserId)
      );
    },
    follow: () => {
      useResetQuery(QueryAction.Refetch, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      if (
        userList.some((user) =>
          mostPopularUsers?.some((popUser) => user.id === popUser.id)
        )
      ) {
        useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      }
    },

    unFollowIfPublicUser: (pubUserId: number) => {
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowersKey(pubUserId)
      );
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowingKey(pubUserId)
      );
    },
    unFollow: () => {
      useResetQuery(QueryAction.Refetch, userGetFollowingKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());

      if (
        userList.some((user) =>
          mostPopularUsers?.some((popUser) => user.id === popUser.id)
        )
      ) {
        useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      }
    },
  };
};

export const invPublicProfileMediabarData = () => {
  return {
    followIfPublicUser: (pubUserId: number) => {
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowersKey(pubUserId)
      );
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowingKey(pubUserId)
      );
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },
    follow: () => {},

    unFollowIfPublicUser: (pubUserId: number) => {
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowersKey(pubUserId)
      );
      useResetQuery(
        QueryAction.Invalidate,
        publicProfileFollowingKey(pubUserId)
      );
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
    },
    unFollow: () => {},
  };
};
