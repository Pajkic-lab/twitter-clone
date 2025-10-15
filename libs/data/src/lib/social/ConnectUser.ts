export type ConnectUser = (
  connectUserId: string,
  followingStatus: boolean,
  publicUserId?: string,
) => Promise<void> | undefined;
