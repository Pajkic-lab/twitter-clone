export const invDataEmpty = () => {
  return {
    followIfPublicUser: (pubUserId: string) => {},
    follow: () => {},

    unFollowIfPublicUser: (pubUserId: string) => {},
    unFollow: () => {},
  };
};
