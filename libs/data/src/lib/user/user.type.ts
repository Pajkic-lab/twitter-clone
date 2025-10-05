import { AutoMap } from '@automapper/classes';
import { Social, User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { Request } from 'express';

export class UserBase implements User {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  password: string;

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

export class UserWithFollowingStatus extends UserBase {
  @AutoMap()
  followingStatus: boolean;
}

export class SocialBase implements Social {
  @AutoMap()
  id: number;

  @AutoMap()
  userId: string;

  @AutoMap()
  followingId: string;
}

class UserIdProperty {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export type RequestContainingUserId = Request & {
  user: UserIdProperty;
};

export class CreatableUser {
  name: string;
  email: string;
  password: string;
}

export class CreatableGoogleUser {
  email: string;
  name: string;
}

export enum MediaDirectory {
  avatar = 'avatar',
  cover = 'cover',
  post = 'post',
}

export class PublicUserBase {
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
