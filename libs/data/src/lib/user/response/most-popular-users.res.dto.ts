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
