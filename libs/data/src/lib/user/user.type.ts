import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Request } from 'express';
import { User } from '@prisma/client';
import { AutoMap } from '@automapper/classes';

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
