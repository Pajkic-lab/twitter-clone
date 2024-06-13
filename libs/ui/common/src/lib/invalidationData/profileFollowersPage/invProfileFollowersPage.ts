import { FollowerListResponseDto, MostPopularUsersResponseDto } from '@tw/data';
import {
  QueryAction,
  mostPopularUsersQueryKey,
  useResetQuery,
  userGetFollowersKey,
  userGetFollowingKey,
} from '@tw/ui/data-access';

export const invFollowersData = (
  userList: FollowerListResponseDto[],
  mostPopularUsers: MostPopularUsersResponseDto[] | undefined
) => {
  return {
    followIfPublicUser: (pubUserId: number) => {}, // should be optional for all
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

    unFollowIfPublicUser: (pubUserId: number) => {}, // should be optional for all
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

export const invMediabarData = () => {
  return {
    followIfPublicUser: (pubUserId: number) => {}, // should be optional for all
    follow: () => {
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
    },

    unFollowIfPublicUser: (pubUserId: number) => {}, // should be optional for all
    unFollow: () => {
      useResetQuery(QueryAction.Invalidate, mostPopularUsersQueryKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowersKey());
      useResetQuery(QueryAction.Invalidate, userGetFollowingKey());
    },
  };
};
