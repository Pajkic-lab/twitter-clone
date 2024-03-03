import { AutoMap } from '@automapper/classes';

export class SearchUsersResponseDto {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  avatar: string;

  @AutoMap()
  uniqueName: string;
}
