export type InvalidationData = {
  followIfPublicUser: (pubUserId: number) => void;
  follow: () => void;
  unFollowIfPublicUser: (pubUserId: number) => void;
  unFollow: () => void;
};
