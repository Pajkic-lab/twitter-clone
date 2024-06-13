export const invDataEmpty = () => {
  return {
    followIfPublicUser: (pubUserId: number) => {},
    follow: () => {},

    unFollowIfPublicUser: (pubUserId: number) => {},
    unFollow: () => {},
  };
};
