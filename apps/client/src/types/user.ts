export interface User {
  id: number | null;
  name: string;
  email: string;
  avatar: string;
  cover: string;
  uniqueName: string;
  bio: string;
  location: string;
  website: string;
  createdAt: string;
  followingStatus?: boolean;
}

export interface SocialStats {
  followingCount: number;
  followersCount: number;
}

export type UpdateUser = Partial<
  Pick<User, 'name' | 'bio' | 'location' | 'website' | 'cover' | 'avatar'>
>;

export type PublicUser = Omit<User, 'email'>;
