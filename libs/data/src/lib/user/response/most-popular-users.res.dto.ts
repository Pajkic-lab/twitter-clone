import { AutoMap } from '@automapper/classes';

export class MostPopularUsersResponseDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  avatar: string;

  @AutoMap()
  uniqueName: string;
}

/*
export class FollowerListResponseDto {
  @AutoMap()
  followingStatus: boolean;

  @AutoMap()
  id: number;

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

*/
