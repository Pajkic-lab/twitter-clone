import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Request } from 'express';
import { Social, User } from '@prisma/client';
import { AutoMap } from '@automapper/classes';

// This entire dir has to be refactored!!!
export class UserBase implements User {
  @AutoMap()
  id: number;

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
  userId: number;

  @AutoMap()
  followingId: number;
}

class UserIdProperty {
  @IsNotEmpty()
  @IsNumber()
  id: number;
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

// should be renamed
export enum MediaDirectory {
  Private = 'private',
  Public = 'public',
}
