import { AutoMap } from '@automapper/classes';

export class AuthenticationResponseDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  createdAt: string;
}
