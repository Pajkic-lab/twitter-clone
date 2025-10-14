// Should be completely replace by shared types for Data lib
export interface User {
  id: string | null;
  name: string;
  email: string;
  avatar: string;
  cover: string;
  uniqueName: string;
  bio: string;
  location: string;
  website: string;
  createdAt: string | Date;
  followingStatus?: boolean;
}

export type UpdateUser = Partial<
  Pick<User, 'name' | 'bio' | 'location' | 'website' | 'cover' | 'avatar'>
>;

export type PublicUser = Omit<User, 'email'>;
