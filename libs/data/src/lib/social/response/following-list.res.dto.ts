import { AutoMap } from '@automapper/classes';

export class FollowingListResponseDto {
  @AutoMap()
  followingStatus: boolean;

  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  name: string;

  @AutoMap()
  avatar: string;

  @AutoMap()
  cover: string;

  @AutoMap()
  uniqueName: string;

  @AutoMap()
  bio: string;

  @AutoMap()
  location: string;

  @AutoMap()
  website: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
