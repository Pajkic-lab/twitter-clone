export type InvalidationData = {
  followIfPublicUser: (pubUserId: string) => void;
  follow: () => void;
  unFollowIfPublicUser: (pubUserId: string) => void;
  unFollow: () => void;
};
