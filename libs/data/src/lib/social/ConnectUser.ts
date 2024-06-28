export type ConnectUser = (
  connectUserId: number,
  followingStatus: boolean,
  publicUserId?: number
) => Promise<void> | undefined;
