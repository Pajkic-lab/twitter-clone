import { AutoMap } from '@automapper/classes';

export class UserResponseDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

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
  createdAt: Date | string;

  @AutoMap()
  updatedAt: Date | string;
}
