import { AutoMap } from '@automapper/classes';

export class SignInEmailResponseDto {
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
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
